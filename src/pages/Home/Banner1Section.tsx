import { Box, Container, Typography, useTheme } from "@mui/material";
import { COLOR_WHITE } from "../../utils/constants";
import { ISxProps } from "../../utils/interfaces";

export default function Banner1Section({ sx }: ISxProps) {
  const theme = useTheme()
  return (
    <Box sx={{ ...sx, bgcolor: theme.palette.primary.main }} py={8}>
      <Container maxWidth="lg">
        <Typography textAlign="center" variant="h4" color={COLOR_WHITE} fontWeight={900}>
          Permissionless, compliant, and first-of-its-kind
        </Typography>
        <Typography textAlign="center" variant="h6" color={COLOR_WHITE} sx={{ mt: 4 }}>
          Klasma Token provides investors with a simple, intelligent, and user-friendly method to buy into fractional, tokenised properties, leveraging the Australian legal system and the permissionless, unrestricted token issuance of Ethereum Investing with Klasma means low maintenance property ownership, access to cash flows related to the property (e.g., rent), and frictionless ownership transactions via Klasma Tokens.
        </Typography>
      </Container>
    </Box>
  )
}