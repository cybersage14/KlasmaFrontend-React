import { 
  Button, 
  Checkbox, 
  Container, 
  FormControlLabel, 
  IconButton, 
  InputAdornment, 
  Link, 
  Stack, 
  TextField, 
  Typography, 
  useTheme 
} from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { useState } from "react";
import { LoginSocialGoogle, IResolveParams } from 'reactjs-social-login';
import { Link as RouterLink } from 'react-router-dom';

const validSchema = yup.object().shape({
  email: yup.string().email('Invaild email style.').required('Please input your email address.'),
  password: yup.string().required('Please input your password.')
});

export default function Login() {
  const theme = useTheme()
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
    <Container maxWidth="xs" sx={{ py: 6 }}>
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

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me"
          />
          <Link component={RouterLink} to="/reset-password" sx={{ textDecoration: 'none' }}>
            Forgot password?
          </Link>
        </Stack>

        <Stack spacing={2}>
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
          No account? <Link component={RouterLink} to="/signup" sx={{ textDecoration: 'none' }}>
            Create a new one.
          </Link>
        </Typography>
      </Stack>
    </Container>
  )
}