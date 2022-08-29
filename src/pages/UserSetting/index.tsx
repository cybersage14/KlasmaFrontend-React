import { Button, Container, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useState } from "react";
import { Icon } from "@iconify/react";

const validSchema = yup.object().shape({
  currentPassword: yup.string().required('Please input a password'),
  password: yup.string().min(3, 'Password should be 3 characters at minimum.').required('Please input a password.'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords have to be matched.')
});

export default function UserSetting() {
  const [visibleCurrentPassword, setVisibleCurrentPassword] = useState(false)
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
    }
  })

  const handleVisibleCurrentPassword = () => {
    setVisibleCurrentPassword(!visibleCurrentPassword)
  }

  const handleVisiblePassword = () => {
    setVisiblePassword(!visiblePassword)
  }

  const handleVisibleConfirmPassword = () => {
    setVisibleConfirmPassword(!visibleConfirmPassword)
  }

  return (
    <Container maxWidth="xs" sx={{ py: 3 }}>
      <Typography variant="h6" fontWeight={700}>Set Password</Typography>
      <Stack spacing={2} mt={3}>
        {/* Current password */}
        <TextField
          type={visibleCurrentPassword ? 'text' : 'password'}
          name="currentPassword"
          label="Current password"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
          helperText={
            formik.touched.currentPassword && formik.errors.currentPassword ? (
              <Typography
                component="span"
                sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
              >
                <Icon icon="bxs:error-alt" />&nbsp;
                {formik.touched.currentPassword && formik.errors.currentPassword}
              </Typography>
            ) : (<></>)
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => handleVisibleCurrentPassword()}>
                  {
                    visibleCurrentPassword ? (
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

        {/* New password */}
        <TextField
          type={visiblePassword ? 'text' : 'password'}
          name="password"
          label="New password"
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

        {/* Confirm password */}
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

        <Stack direction="row" justifyContent="end">
          <Button variant="contained" onClick={() => formik.handleSubmit()}>Update</Button>
        </Stack>
      </Stack>
    </Container>
  )
}