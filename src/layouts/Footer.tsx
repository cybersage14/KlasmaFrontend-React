import { Icon } from "@iconify/react";
import { 
  Box, 
  Container, 
  Grid, 
  Stack, 
  Typography, 
  useTheme, 
  Icon as MuiIcon, 
  Fab, 
  Button 
} from "@mui/material";
import { COLOR_DARK, COLOR_WHITE } from "../utils/constants";

const CONTACT_DATA = [
  {
    icon: 'fa6-solid:location-dot',
    label: 'PO Box 2026 Clovelly West, NSW 2031'
  },
  {
    icon: 'carbon:phone-filled',
    label: '1300 000 000'
  },
  {
    icon: 'clarity:email-solid',
    label: 'info@klasma.co'
  }
]

const SOCIAL_LINKS = [
  {
    icon: 'akar-icons:twitter-fill',
    url: '#'
  },
  {
    icon: 'akar-icons:linkedin-box-fill',
    url: '#'
  },
  {
    icon: 'bi:medium',
    url: '#'
  },
  {
    icon: 'akar-icons:youtube-fill',
    url: '#'
  },
  {
    icon: 'ant-design:wechat-filled',
    url: '#'
  },
  {
    icon: 'cib:telegram-plane',
    url: '#'
  },
  {
    icon: 'akar-icons:discord-fill',
    url: '#'
  },
  {
    icon: 'simple-icons:trustpilot',
    url: '#'
  }
]

export default function Footer() {
  const theme = useTheme()
  return (
    <>
      <Box bgcolor={COLOR_DARK} py={{ xs: 6, md: 12 }} position="relative">
        {/* Ribbon */}
        <Box position="absolute" top={{ xs: -12, md: -25 }} left={0} width="100%">
          <Container maxWidth="xl">
            <Stack direction="row" alignItems="start">
              <Box
                sx={{
                  borderBottom: { xs: '13px solid #ad4b1e', md: '25px solid #ad4b1e' },
                  borderLeft: { xs: '10px solid transparent', md: '20px solid transparent' }
                }}
              />
              <Box width={{ xs: 100, md: 200 }} height={{ xs: 30, md: 50 }} bgcolor={theme.palette.primary.main}>
                <Stack direction="row" justifyContent="center" alignItems="center" height="inherit">
                  {/* Ribbon text here */}
                  <Box
                    component="img"
                    src="/assets/images/logo.png"
                    alt="logo"
                    width="90%"
                    height="90%"
                  />
                </Stack>
              </Box>
            </Stack>
          </Container>

        </Box>

        <Container maxWidth="xl">
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Typography variant="h5" fontWeight={700} color={theme.palette.primary.main}>
                  Contact Info
                </Typography>

                <Stack spacing={1} mt={3}>
                  {
                    CONTACT_DATA.map(dataItem => (
                      <Stack direction="row" alignItems="center" spacing={1} key={dataItem.label}>
                        <MuiIcon color="primary" sx={{ height: 'auto' }}>
                          <Icon icon={dataItem.icon} />
                        </MuiIcon>
                        <Typography component="span" variant="body1" color={COLOR_WHITE}>
                          {dataItem.label}
                        </Typography>
                      </Stack>
                    ))
                  }
                </Stack>

                <Stack direction="row" alignItems="center" spacing={1} mt={3}>
                  {
                    SOCIAL_LINKS.map((dataItem, index) => (
                      <Fab
                        size="small"
                        key={index}
                        sx={{ fontSize: 24, bgcolor: theme.palette.primary.main }}
                      >
                        <Icon icon={dataItem.icon} />
                      </Fab>
                    ))
                  }
                </Stack>

                <Stack direction="row" alignItems="center" spacing={2} mt={3}>
                  <Button>Privacy Policy</Button>
                  <Button>Terms & Condition</Button>
                  <Button>Refund Policy</Button>
                </Stack>
              </Grid>

              <Grid item xs={12} md={8}>
                <Typography variant="body1" color={COLOR_WHITE} textAlign="justify">
                  This information is not an offer to invest in any token, Fund or other opportunity and is provided for information only. Performance results are shown net of all fees, costs, and expenses associated with the token. Should an investor choose to redeem a token through Klasma Pty Ltd (Klasma) or on a secondary market, other processing fees may be assessed that are not factored into the returns presented. Past performance does not guarantee future results. Returns are calculated based on the rental payments distributed throughout the year and the appreciation in value of the underlying property. The appreciation in value is based on the difference between purchase price and annual property reappraisals. Individual investor returns may vary based on the timing of their investments and redemptions. This site is operated by Klasma Pty Ltd, which is not a registered broker-dealer or investment advisor. Klasma does not give investment advice, endorsement, analysis or recommendations with respect to any securities. Nothing on this website should be construed as an offer to sell, solicitation of an offer to buy or a recommendation for any security by Klasma or any third party. You are solely responsible for determining whether any investment, investment strategy, security or related transaction is appropriate for you based on your personal investment objectives, financial circumstances and risk tolerance. You should consult with licensed legal professionals and investment advisors for any legal, tax, insurance or investment advice. All securities listed here are being offered by, and all information included on this site is the responsibility of, the applicable issuer of such securities. Klasma does not guarantee any investment performance, outcome or return of capital for any investment opportunity posted on this site. By accessing this site and any pages thereof, you agree to be bound by the Terms of Service and Privacy Policy. Please view our general disclaimer and accessibility statement as well.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box bgcolor='#222222' py={3}>
        <Typography 
          textAlign="center" 
          variant="body1" 
          fontWeight={700} 
          color={theme.palette.primary.main}
        >
          © {new Date().getFullYear()} Klasma Pty Ltd All Rights Reserved
        </Typography>
      </Box>
    </>
  )
}