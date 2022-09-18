import { Button, Container, Stack, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth";

export default function ResendEmailVerification() {
  const { currentUser, resendEmailVerificationLinkAct } = useAuth()

  const resendLink = () => {
    if (currentUser) {
      resendEmailVerificationLinkAct(currentUser.id_user)
    }
  }
  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={900} textAlign="center">Email Verification</Typography>
      <Typography variant="body1" textAlign="center">Please check your mail inbox or spam.</Typography>
      <Stack direction="row" justifyContent="center" mt={3}>
        <Button variant="contained" onClick={resendLink}>
          Resend link
        </Button>
      </Stack>
    </Container>
  )
}