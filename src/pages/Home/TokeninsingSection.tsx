import { Button, Container, Typography, useTheme } from "@mui/material";
import { ISxProps } from "../../utils/interfaces";

export default function TokeninsingSection({ sx }: ISxProps) {
  const theme = useTheme()
  return (
    <Container maxWidth="lg" sx={{ ...sx }}>
      <Typography variant="body1" textTransform="uppercase" color={theme.palette.primary.main} fontWeight={600}>
        TOKEINSING REAL ESTATE
      </Typography>

      <Typography variant="h4" fontWeight={700} color={theme.palette.primary.main}>
        Permissionless, compliant, and innovative
      </Typography>

      <Typography variant="body1" mt={3}>
        Tokenising real estate become the focus of many global institutions in 2018, and is likely to continue into the future as Ethereum offers a way to add improved levels of liquidity (tokens) to a notoriously illiquid industry (real estate).
        Fractional ownership democratises access to real estate investment, and therefore distributes and minimizes the risks and labour involved with owning property. And Klasma Tokens makes it even simpler!
      </Typography>

      <Button variant="contained" sx={{ mt: 3 }}>Get started</Button>
    </Container>
  )
}