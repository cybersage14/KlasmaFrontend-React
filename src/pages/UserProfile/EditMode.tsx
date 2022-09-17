import {
  Box,
  Button,
  Grid,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  TextField,
  Typography,
  Icon as MuiIcon
} from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import countryList from 'country-list';
import Flag from 'react-world-flags';
import { getStates } from "country-state-picker";
import { useMemo, useState, useEffect } from "react";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from 'dayjs';
import UploadAvatar from "../../components/UploadAvatar";
import useAuth from "../../hooks/useAuth";
import useLoading from "../../hooks/useLoading";
import { generateUniqueFileName } from "../../utils/functions";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../utils/firebase";
import useAlertMessage from "../../hooks/useAlertMessage";
import { ERROR, MESSAGE_FILE_UPLOAD_FAILED } from "../../utils/constants";
import { IUserProfileReq } from "../../utils/interfaces";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validSchemaForIndividual = yup.object().shape({
  firstName: yup.string().required('Please input your first name.'),
  lastName: yup.string().required('Please input your last name.'),
  // email: yup.string().email('Invalid email format.').required('Email is required.'),
  phone: yup.string().matches(phoneRegExp, "Phone number isn't valid.")
})

const validSchemaForCompany = yup.object().shape({
  companyName: yup.string().required('Please input your company name.'),
  // email: yup.string().email('Invalid email format.').required('Email is required.'),
  phone: yup.string().matches(phoneRegExp, "Phone number isn't valid.")
})

const DATA_OF_COUNTRIES = countryList.getData()

export default function EditMode() {
  const { currentUser, updateUserProfileAct } = useAuth()
  const { openLoading, closeLoading } = useLoading()
  const { openAlert } = useAlertMessage()

  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string>('')

  const statesOfCountry = useMemo(() => {
    if (country) {
      return getStates(country.toLowerCase())
    }
  }, [country])

  useEffect(() => {
    if (currentUser) {
      if (currentUser.date_of_birth) {
        setDateOfBirth(dayjs(currentUser.date_of_birth))
      }
      if (currentUser.avatar) {
        setAvatarUrl(currentUser.avatar)
      }
      setCity(currentUser.city)
      setState(currentUser.state)
      setCountry(currentUser.country)
    }
  }, [currentUser])

  //  Initial values for formik
  const initialValues = useMemo(() => {
    if (currentUser?.id_individual) {
      return {
        firstName: currentUser?.first_name || '',
        lastName: currentUser?.last_name || '',
        bio: currentUser?.bio || '',
        email: currentUser?.email,
        phone: currentUser?.phone || '',
        address: currentUser?.address || '',
        postalCode: currentUser?.postal_code || ''
      }
    } else {
      return {
        companyName: currentUser?.company_name,
        bio: currentUser?.bio || '',
        email: currentUser?.email,
        phone: currentUser?.phone || '',
        address: currentUser?.address || '',
        postalCode: currentUser?.postal_code || ''
      }
    }
  }, [currentUser])

  //  Validation schema for formik
  const validationSchema = useMemo(() => {
    if (currentUser?.id_individual) {
      return validSchemaForIndividual
    } else {
      return validSchemaForCompany
    }
  }, [currentUser])

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log('>>>>>> dateOfBirth.format("YYYY-MM-DD") => ', dateOfBirth?.format('YYYY-MM-DD'))
      let { firstName, lastName, companyName, bio, address, phone, postalCode } = values
      let reqData: IUserProfileReq = {
        avatar: avatarUrl,
        bio,
        phone,
        date_of_birth: dateOfBirth?.format('YYYY-MM-DD') || '',
        country,
        state,
        city,
        address,
        postal_code: postalCode
      }
      if (currentUser?.id_company) {
        reqData.company_name = companyName
        updateUserProfileAct(reqData, currentUser.id_user)
      } else if (currentUser?.id_individual) {
        reqData.first_name = firstName;
        reqData.last_name = lastName;
        updateUserProfileAct(reqData, currentUser.id_user)
      }
    }
  })

  const handleCountry = (_country: string) => {
    setCountry(_country)
  }

  const handleState = (_state: string) => {
    setState(_state)
  }

  const handleCity = (_city: string) => {
    setCity(_city)
  }

  const handleSetDateOfBirth = (newValue: Dayjs | null) => {
    if (newValue) {
      setDateOfBirth(newValue)
    }
  }

  const selectAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setAvatarFile(e.target.files[0])
      setAvatarUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  const uploadAvatar = () => {
    if (avatarFile) {
      if (avatarFile instanceof File) {
        openLoading()
        const fileName = generateUniqueFileName(avatarFile.name)
        const storageRef = ref(storage, `/avatars/${fileName}`)
        const uploadProcess = uploadBytesResumable(storageRef, avatarFile)
        uploadProcess.on(
          'state_changed',
          (snapshot) => {
            // let percent = Math.round(
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // )
            // console.log('>>>>> percentage of uploading thumbnail => ', percent)
          },
          error => {
            openAlert({
              severity: ERROR,
              message: MESSAGE_FILE_UPLOAD_FAILED
            })
            console.log(error)
          },
          () => {
            if (uploadProcess) {
              getDownloadURL(uploadProcess.snapshot.ref).then((url) => {
                setAvatarUrl(url)
                setAvatarFile(null)
                closeLoading()
              });
            }
          }
        )
      }
    }
  }

  return (
    <Box>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Stack spacing={1} alignItems="center">
              <UploadAvatar
                avatarUrl={avatarUrl}
                selectAvatar={selectAvatar}
              />
              <Button
                variant="contained"
                startIcon={<MuiIcon><Icon icon="eva:cloud-upload-fill" /></MuiIcon>}
                onClick={() => uploadAvatar()}
                disabled={!avatarFile}
              >
                Upload
              </Button>
            </Stack>

          </Grid>

          <Grid item xs={12} sm={9}>
            <Box mb={2}>
              {
                currentUser?.id_company ? (
                  <TextField
                    name="companyName"
                    label="Company name"
                    value={formik.values.companyName}
                    onChange={formik.handleChange}
                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                    helperText={
                      formik.touched.companyName && formik.errors.companyName ? (
                        <Typography
                          component="span"
                          sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
                        >
                          <Icon icon="bxs:error-alt" />&nbsp;
                          {formik.touched.companyName && formik.errors.companyName}
                        </Typography>
                      ) : (<></>)
                    }
                    fullWidth
                  />
                ) : (
                  <Grid container spacing={2}>
                    {/* First name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="firstName"
                        label="First name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={
                          formik.touched.firstName && formik.errors.firstName ? (
                            <Typography
                              component="span"
                              sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
                            >
                              <Icon icon="bxs:error-alt" />&nbsp;
                              {formik.touched.firstName && formik.errors.firstName}
                            </Typography>
                          ) : (<></>)
                        }
                        fullWidth
                      />
                    </Grid>

                    {/* Last name */}
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="lastName"
                        label="Last name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={
                          formik.touched.lastName && formik.errors.lastName ? (
                            <Typography
                              component="span"
                              sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
                            >
                              <Icon icon="bxs:error-alt" />&nbsp;
                              {formik.touched.lastName && formik.errors.lastName}
                            </Typography>
                          ) : (<></>)
                        }
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                )
              }

            </Box>

            {/* Bio */}
            <TextField
              name="bio"
              label="Bio"
              multiline
              rows={5}
              value={formik.values.bio}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
        </Grid >
      </Box >

      <Box mt={3}>
        <Grid container spacing={2}>
          {/* Email */}
          <Grid item xs={12} sm={4}>
            <TextField
              type="email"
              name="email"
              label="Email"
              value={formik.values.email}
              disabled
              fullWidth
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={4}>
            <TextField
              name="phone"
              label="Phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={
                formik.touched.phone && formik.errors.phone ? (
                  <Typography
                    component="span"
                    sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
                  >
                    <Icon icon="bxs:error-alt" />&nbsp;
                    {formik.touched.phone && formik.errors.phone}
                  </Typography>
                ) : (<></>)
              }
              fullWidth
            />
          </Grid>

          {/* Date of birth */}
          <Grid item xs={12} sm={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date of birth"
                value={dateOfBirth}
                onChange={handleSetDateOfBirth}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </LocalizationProvider>
          </Grid>

          {/* Country */}
          <Grid item xs={12} sm={4}>
            <TextField
              select
              name="country"
              label="Country"
              sx={{
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                }
              }}
              value={country}
              onChange={e => handleCountry(e?.target?.value)}
              fullWidth
            >
              {
                DATA_OF_COUNTRIES.map(dataItem => (
                  <MenuItem value={dataItem.code} key={dataItem.code}>
                    <ListItemIcon sx={{ width: 40, mr: 2, height: 20 }}>
                      <Flag code={dataItem.code} />
                    </ListItemIcon>
                    <ListItemText>
                      {dataItem.name}
                    </ListItemText>
                  </MenuItem>
                ))
              }
            </TextField>
          </Grid>

          {/* State */}
          <Grid item xs={12} sm={4}>
            {
              statesOfCountry ? (
                <TextField
                  select
                  name="state"
                  label="State"
                  value={state}
                  onChange={e => handleState(e?.target?.value)}
                  fullWidth
                >
                  {
                    statesOfCountry.map((stateName: string) => (
                      <MenuItem key={stateName} value={stateName}>{stateName}</MenuItem>
                    ))
                  }
                </TextField>
              ) : (
                <TextField
                  name="state"
                  label="State"
                  value={state}
                  onChange={e => handleState(e?.target?.value)}
                  fullWidth
                />
              )
            }
          </Grid>

          {/* City */}
          <Grid item xs={12} sm={4}>
            <TextField
              name="city"
              label="City"
              value={city}
              onChange={e => handleCity(e?.target?.value)}
              fullWidth
            />
          </Grid>

          {/* Address */}
          <Grid item xs={12} sm={4}>
            <TextField
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>

          {/* Postal Code */}
          <Grid item xs={12} sm={4}>
            <TextField
              name="postalCode"
              label="Postal code"
              value={formik.values.postalCode}
              onChange={formik.handleChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </Box>

      <Stack direction="row" justifyContent="end">
        <Button variant="contained" onClick={() => formik.handleSubmit()} disabled={!!avatarFile}>
          Save Profile
        </Button>
      </Stack>
    </Box >
  )
}