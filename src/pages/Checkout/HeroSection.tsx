import { Box, Container, Grid, Typography } from "@mui/material"
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import { COLOR_PRIMARY, COLOR_WHITE, COLOR_DARK } from "../../utils/constants"
import { ISxProps } from "../../utils/interfaces"

export default function HeroSection({ sx }: ISxProps) {
  return (
    <Box bgcolor={COLOR_DARK}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="h3"
              color={COLOR_PRIMARY}
              fontWeight={800}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              Checkout
            </Typography>

            <Typography
              variant="body1"
              color={COLOR_WHITE}
              mt={3}
              textAlign={{ xs: 'center', md: 'justify' }}
            >
              Klasma is a union of seasoned real estate and blockchain industry executives, along with marketing, ecommerce and technology experts. Together, we are executing our collective vision of democratising real estate ownership. "The ability for all to participate and invest in real estate ownership."
            </Typography>
          </Grid>

          <Grid item xs={12} md={1} />

          <Grid item xs={12} md={4}>
            <Box width="100%">
              <Player
                autoplay
                loop
                src="https://assets2.lottiefiles.com/packages/lf20_bnecesf3.json"
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