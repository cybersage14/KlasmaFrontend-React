import { Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import useAuth from "../hooks/useAuth";
import { VALUE_OF_VERIFIED } from "../utils/constants";

export default function EmailVerificationResult() {
  const { currentUser } = useAuth()
  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      {
        currentUser?.email_verified === VALUE_OF_VERIFIED ? (
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h4" fontWeight={900} textAlign="center">
              Email Verification Success.
            </Typography>
            <Button
              component={RouterLink}
              to="/"
              variant="contained"
            >
              Go to homepage
            </Button>
          </Stack>
        ) : (
          <Stack alignItems="center" spacing={2}>
            <Typography variant="h4" fontWeight={900} textAlign="center">
              Email Verification Failed.
            </Typography>
            <Button
              component={RouterLink}
              to="/resend-email-verification"
              variant="contained"
            >
              Resend email verification
            </Button>
          </Stack>
        )
      }
    </Container>
  )
}