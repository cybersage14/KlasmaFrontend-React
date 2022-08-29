import { 
  Box, 
  Button, 
  Grid, 
  ListItemIcon, 
  ListItemText, 
  MenuItem, 
  Stack, 
  TextField, 
  Typography 
} from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import countryList from 'country-list';
import Flag from 'react-world-flags';
import { getStates } from "country-state-picker";
import { useMemo, useState } from "react";
import UploadAvatar from "../../components/UploadAvatar";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validSchema = yup.object().shape({
  firstName: yup.string().required('Please input your first name.'),
  lastName: yup.string().required('Please input your last name.'),
  email: yup.string().email('Invalid email format.').required('Email is required.'),
  phone: yup.string().matches(phoneRegExp, "Phone number isn't valid.")
})

const DATA_OF_COUNTRIES = countryList.getData()

export default function EditMode() {
  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const statesOfCountry = useMemo(() => {
    if (country) {
      return getStates(country.toLowerCase())
    }
  }, [country])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      bio: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      postalCode: ''
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
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

  return (
    <Box>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <UploadAvatar />
          </Grid>

          <Grid item xs={12} sm={9}>
            <Box mb={2}>
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
        </Grid>
      </Box>

      <Box mt={3}>
        <Grid container spacing={2}>
          {/* Email */}
          <Grid item xs={12} sm={4}>
            <TextField
              type="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={
                formik.touched.email && formik.errors.email ? (
                  <Typography
                    component="span"
                    sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
                  >
                    <Icon icon="bxs:error-alt" />&nbsp;
                    {formik.touched.email && formik.errors.email}
                  </Typography>
                ) : (<></>)
              }
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
            <TextField
              type="date"
              name="dateOfBirth"
              label="Date of birth"
              value={formik.values.dateOfBirth}
              onChange={formik.handleChange}
              fullWidth
            />
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
        <Button variant="contained">
          Save Profile
        </Button>
      </Stack>
    </Box>
  )
}