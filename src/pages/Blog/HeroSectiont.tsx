import { Box, Container, Grid, Typography } from "@mui/material"
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import { COLOR_PRIMARY, COLOR_WHITE, COLOR_DARK } from "../../utils/constants"
import { ISxProps } from "../../utils/interfaces"

export default function HeroSection({ sx }: ISxProps) {
  return (
    <Box bgcolor={COLOR_DARK}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 6 } }}>
        <Grid container spacing={5} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h3"
              color={COLOR_PRIMARY}
              fontWeight={800}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              Klasma Blog
            </Typography>
            <Typography
              variant="body1"
              textTransform="uppercase"
              textAlign={{ xs: 'center', md: 'left' }}
              color={COLOR_WHITE}
              mt={3}
            >
              LEARN MORE ABOUT TOKENISATION
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box width="100%">
              <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_4sabgt2r.json"
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