import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material"
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import { COLOR_PRIMARY, COLOR_WHITE, COLOR_DARK } from "../../utils/constants"

export default function HeroSection() {
  return (
    <Box bgcolor={COLOR_DARK}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 14 } }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="h3"
              color={COLOR_PRIMARY}
              fontWeight={800}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              Fractional and frictionless real estate investing
            </Typography>
            <Typography
              variant="h6"
              textTransform="uppercase"
              color={COLOR_WHITE}
              mt={2}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              DEMOCRATISING REAL ESTATE OWNERSHIP
            </Typography>
            <Typography
              variant="body1"
              color={COLOR_WHITE}
              mt={1}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              Now any Australian investors can buy into the real estate market through fully-compliant, fractional, tokenised ownership. Powered by blockchain.
            </Typography>
            <Stack direction="row" justifyContent={{ xs: 'center', md: 'left' }}>
              <Button variant="contained" sx={{ mt: 3 }}>
                Get Started
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            <Box width="100%">
              <Player
                autoplay
                loop
                src="https://assets10.lottiefiles.com/packages/lf20_bkqasnam.json"
                style={{ width: '100%' }}
                speed={1}
              >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
              </Player>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}