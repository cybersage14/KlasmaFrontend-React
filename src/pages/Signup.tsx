import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { useContext, useMemo, useState } from "react";
import { IResolveParams, LoginSocialGoogle } from "reactjs-social-login";
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";

/* ----------------------- Valid schema ------------------------ */
const defaultValidShapes = {
  email: yup.string().email('Invaild email format.').required('Email is required.'),
  password: yup.string().min(3, 'Password should be 3 characters at minimum.').required('Please input a password.'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords have to be matched.')
}

const validSchemaForIndividual = yup.object().shape({
  firstName: yup.string().required('Please input your first name.'),
  lastName: yup.string().required('Please input your last name.'),
  ...defaultValidShapes
});

const validSchemaForCompany = yup.object().shape({
  companyName: yup.string().required('Please input your company name.'),
  ...defaultValidShapes
});
/* -------------------------------------------------------------- */

export default function Signup() {
  const theme = useTheme()

  const { signupByEmailAct, signupByGoogleAct } = useContext(AuthContext)

  const [visiblePassword, setVisiblePassword] = useState<Boolean>(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState<Boolean>(false)
  const [userType, setUserType] = useState('individual')

  const validSchema = useMemo(() => {
    if (userType === 'individual') {
      return validSchemaForIndividual
    }
    return validSchemaForCompany
  }, [userType])

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      companyName: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
      let { firstName, lastName, companyName, email, password } = values

      if (userType === 'individual') {
        signupByEmailAct({ firstName, lastName, email, password }, userType)
      } else {
        signupByEmailAct({ companyName, email, password }, userType)
      }
    }
  })

  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword)
  }

  const handleVisibleConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword)
  }

  const handleUserType = (_userType: string) => {
    setUserType(_userType)
  }

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={900} textAlign="center">
        Create your Account
      </Typography>

      <Stack spacing={2} mt={4}>
        {
          userType === 'individual' ? (
            <Box>
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
          ) : (
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
          )
        }

        {/* Email */}
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
        />

        <Box>
          <Grid container spacing={2}>
            {/* Password */}
            <Grid item xs={12} sm={6}>
              <TextField
                type={visiblePassword ? 'text' : 'password'}
                name="password"
                label="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={
                  formik.touched.password && formik.errors.password ? (
                    <Typography
                      component="span"
                      sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
                    >
                      <Icon icon="bxs:error-alt" />&nbsp;
                      {formik.touched.password && formik.errors.password}
                    </Typography>
                  ) : (<></>)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleVisiblePassword()}>
                        {
                          visiblePassword ? (
                            <Icon icon="ant-design:eye-invisible-filled" />
                          ) : (
                            <Icon icon="ant-design:eye-filled" />
                          )
                        }

                      </IconButton>
                    </InputAdornment>
                  )
                }}
                fullWidth
              />
            </Grid>

            {/* Confirm password */}
            <Grid item xs={12} sm={6}>
              <TextField
                type={visibleConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                label="Confirm password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                helperText={
                  formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <Typography
                      component="span"
                      sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
                    >
                      <Icon icon="bxs:error-alt" />&nbsp;
                      {formik.touched.confirmPassword && formik.errors.confirmPassword}
                    </Typography>
                  ) : (<></>)
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => handleVisibleConfirmPassword()}>
                        {
                          visibleConfirmPassword ? (
                            <Icon icon="ant-design:eye-invisible-filled" />
                          ) : (
                            <Icon icon="ant-design:eye-filled" />
                          )
                        }

                      </IconButton>
                    </InputAdornment>
                  )
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Box>
        
        {/* Set user type */}
        <Stack direction="row" justifyContent="center">
          <RadioGroup
            row
            value={userType}
            onChange={e => handleUserType(e?.target?.value)}
          >
            <FormControlLabel value="individual" control={<Radio />} label="I'm individual." />
            <FormControlLabel value="company" control={<Radio />} label="I'm a company." />
          </RadioGroup>
        </Stack>

        <Stack spacing={2}>
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            Register
          </Button>

          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''}
            onLoginStart={() => { console.log('start') }}
            onResolve={({ provider, data }: IResolveParams) => {
              console.log('>>>>>> provider => ', provider)
              console.log('>>>>>> data => ', data)

              if (userType === 'individual') {
                signupByGoogleAct({
                  firstName: data?.family_name || '',
                  lastName: data?.given_name || '',
                  googleId: data?.id || '',
                  avatar: data?.picture || ''
                }, userType)
              } else {
                signupByGoogleAct({
                  firstName: data?.family_name || '',
                  lastName: data?.given_name || '',
                  googleId: data?.id || '',
                  avatar: data?.picture || ''
                }, userType)
              }
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <Button
              variant="contained"
              startIcon={<Icon icon="akar-icons:google-fill" />}
              fullWidth
              sx={{ bgcolor: theme.palette.error.main }}
            >
              Continue with Google
            </Button>
          </LoginSocialGoogle>
        </Stack>

        <Typography variant="body1">
          Have an account? <Link component={RouterLink} to="/login" sx={{ textDecoration: 'none' }}>
            Go to login.
          </Link>
        </Typography>
      </Stack>
    </Container>
  )
}