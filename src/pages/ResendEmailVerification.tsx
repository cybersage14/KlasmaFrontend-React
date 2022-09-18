import { Button, Container, Stack, Typography } from "@mui/material";

export default function ResendEmailVerification() {
  return (
    <Container maxWidth="xs" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={900} textAlign="center">Email Verification</Typography>
      <Typography variant="body1" textAlign="center">Please check your mail inbox.</Typography>
      <Stack direction="row" justifyContent="center" mt={3}>
        <Button variant="contained">
          Resend link
        </Button>
      </Stack>
    </Container>
  )
}