import { Button, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { LoginSocialGoogle, IResolveParams } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';

const validSchema = yup.object().shape({
  email: yup.string().email('Invaild email style.').required('Please input your email address.'),
  password: yup.string().required('Please input your password.')
});

export default function Login() {
  const [visiblePassword, setVisiblePassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
      // let { email, password } = values
    }
  })

  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword)
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" fontWeight={900} textAlign="center">Log in</Typography>
      <Stack spacing={3} mt={4}>
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
        />

        <Stack spacing={1}>
          <Button variant="contained" onClick={() => formik.handleSubmit()}>
            Login with Email
          </Button>

          <LoginSocialGoogle
            client_id={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''}
            onLoginStart={() => { console.log('start') }}
            onResolve={({ provider, data }: IResolveParams) => {
              console.log('>>>>>> provider => ', provider)
              console.log('>>>>>> data => ', data)
            }}
            onReject={(err) => {
              console.log(err)
            }}
          >
            <GoogleLoginButton />
          </LoginSocialGoogle>
        </Stack>
      </Stack>
    </Container>
  )
}