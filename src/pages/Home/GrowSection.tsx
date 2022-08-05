import { Box, Card, Container, Grid, Paper, Stack, Typography, useTheme } from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import { IGrowData, ISxProps } from "../../utils/interfaces";

const DATA: Array<IGrowData> = [
  {
    title: 'Unique Tokens',
    description: 'Ownership of each property is distributed across a finite number of representative tokens. Based on token share, owners can collect revenue from rent, and vote on property decisions.',
    image: '/assets/images/grow_unique.png'
  },
  {
    title: 'Property Managed',
    description: "Each Klasma property has a property management company managing the property on Klasma Token owners' behalf. The property management company sources tenants, collects rent, and manages repairs, so the diverse group of Klasma Token owners don’t have to.",
    image: '/assets/images/grow_property.png'
  },
  {
    title: 'Legal Entity',
    description: "Real estate can’t directly be tokenised, but legal entities, such as a company can. Each property is owned by an Australia company. Each of the company's shares on issue are tokenised to specific Klasma Tokens and made available for purchase.",
    image: '/assets/images/grow_legal.png'
  },
  {
    title: 'Weekly Rent Payments',
    description: 'With blockchains, we no longer need to wait 30 days to receive a bank transfer. Owning property through Klasma allows you to collect rent every week. Rent is paid using a stablecoin, sent to your xDai or Ethereum wallet.',
    image: '/assets/images/grow_weekly.png'
  }
]

export default function GrowSection({ sx }: ISxProps) {
  const theme = useTheme()
  return (
    <Container maxWidth="lg" sx={{ ...sx }}>
      <SectionTitle
        title="Grow an Australian, digital real estate portfolio"
      />

      <Box mt={6}>
        <Grid container spacing={{ xs: 6, sm: 3, md: 3 }}>
          {
            DATA.map(dataItem => (
              <Grid item xs={12} sm={6} md={3} key={dataItem.title}>
                <Paper elevation={12} sx={{ height: '85%', pb: 3, px: 3, pt: 8 }}>
                  <Stack direction="row" justifyContent="center">
                    <Box
                      component="img"
                      src={dataItem.image}
                      alt={dataItem.title}
                    />
                  </Stack>

                  <Typography
                    variant="h6"
                    textAlign="center"
                    color={theme.palette.primary.main}
                    sx={{ mt: 3 }}
                  >
                    {dataItem.title}
                  </Typography>

                  <Typography
                    variant="body1"
                    textAlign="center"
                    color={theme.palette.primary.dark}
                    sx={{ mt: 1 }}
                  >
                    {dataItem.description}
                  </Typography>
                </Paper>
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Container>
  )
}