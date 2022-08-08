import { Box, Button, Container, Grid, Paper, Stack, Typography } from "@mui/material"
import { Player, Controls } from '@lottiefiles/react-lottie-player'
import { COLOR_PRIMARY, COLOR_WHITE, COLOR_DARK } from "../../utils/constants"
import { ISxProps } from "../../utils/interfaces"

export default function HeroSection({ sx }: ISxProps) {
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
              Our Listings
            </Typography>
            <Typography
              variant="h4"
              color={COLOR_PRIMARY}
              fontWeight={800}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              Become the landlord of the future
            </Typography>
            <Typography
              variant="body1"
              color={COLOR_WHITE}
              mt={1}
              textAlign={{ xs: 'center', md: 'left' }}
            >
              Australian investors can buy into the real estate market through fully-compliant, fractional, tokenised ownership. Powered by blockchain.
            </Typography>
            <Typography
              variant="body1"
              textTransform="uppercase"
              textAlign={{ xs: 'center', md: 'left' }}
              color={COLOR_WHITE}
              mt={3}
            >
              LOOKING FOR OUR OLDER OFFERINGS?
            </Typography>
            <Stack direction="row" justifyContent={{ xs: 'center', md: 'left' }} mt={2}>
              <Button variant="contained">
                Previous Properties
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12} md={5}>
            {/* <Box width="100%">
              <Player
                autoplay
                loop
                src="https://assets5.lottiefiles.com/packages/lf20_vjrlq3tj.json"
                style={{ width: '100%' }}
                speed={1}
              >
                <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
              </Player>
            </Box> */}
            <Paper
              component={Player}
              autoplay
              loop
              src="https://assets5.lottiefiles.com/packages/lf20_vjrlq3tj.json"
              style={{ width: '100%' }}
              speed={1}
              elevation={12}
            >
              <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}