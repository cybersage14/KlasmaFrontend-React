import { Box, Container, Grid, Typography } from "@mui/material"
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import { COLOR_PRIMARY, COLOR_WHITE, COLOR_DARK } from "../../utils/constants"
import { ISxProps } from "../../utils/interfaces"

export default function HeroSection({ sx }: ISxProps) {
  return (
    <Box bgcolor={COLOR_DARK}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              color={COLOR_PRIMARY}
              fontWeight={800}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              Learn About Klasma
            </Typography>

            <Typography
              variant="body1"
              color={COLOR_WHITE}
              mt={3}
              textAlign={{ xs: 'center', md: 'justify' }}
            >
              New to blockchains, cryptocurrency, and tokenisation? It's easier than it seems! We're here to help you learn about the new, alternative financial system that blockchains have to offer. Here you can learn how to manage owning property on the blockchain!
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box width="100%">
              <Player
                autoplay
                loop
                src="https://assets2.lottiefiles.com/packages/lf20_fq7pwzey.json"
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