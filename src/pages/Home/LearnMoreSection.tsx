import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import LearnMoreCard from "../../components/LearnMoreCard";
import { ILearnMoreData, ISxProps } from "../../utils/interfaces";

const DATA: Array<ILearnMoreData> = [
  {
    id: 1,
    title: 'Warning! Fake Realtokens Being Offered On Swap.cat',
    description: 'in english as of november 6, 2021 there were one or more malicious actors creating fake realt tokens for sale on swap.cat (and they could potentially be for sale elsewhere). we ask that our members be extremely careful with token purchases outside',
    date: '2022-03-16',
    image: '/assets/images/learn-more.png'
  },
  {
    id: 2,
    title: 'Warning! Fake Realtokens Being Offered On Swap.cat',
    description: 'in english as of november 6, 2021 there were one or more malicious actors creating fake realt tokens for sale on swap.cat (and they could potentially be for sale elsewhere). we ask that our members be extremely careful with token purchases outside',
    date: '2022-03-16',
    image: '/assets/images/learn-more.png'
  },
  {
    id: 3,
    title: 'Warning! Fake Realtokens Being Offered On Swap.cat',
    description: 'in english as of november 6, 2021 there were one or more malicious actors creating fake realt tokens for sale on swap.cat (and they could potentially be for sale elsewhere). we ask that our members be extremely careful with token purchases outside',
    date: '2022-03-16',
    image: '/assets/images/learn-more.png'
  },
  {
    id: 4,
    title: 'Warning! Fake Realtokens Being Offered On Swap.cat',
    description: 'in english as of november 6, 2021 there were one or more malicious actors creating fake realt tokens for sale on swap.cat (and they could potentially be for sale elsewhere). we ask that our members be extremely careful with token purchases outside',
    date: '2022-03-16',
    image: '/assets/images/learn-more.png'
  },
  {
    id: 5,
    title: 'Warning! Fake Realtokens Being Offered On Swap.cat',
    description: 'in english as of november 6, 2021 there were one or more malicious actors creating fake realt tokens for sale on swap.cat (and they could potentially be for sale elsewhere). we ask that our members be extremely careful with token purchases outside',
    date: '2022-03-16',
    image: '/assets/images/learn-more.png'
  }
]

export default function LearnMoreSection({ sx }: ISxProps) {
  const theme = useTheme()
  return (
    <Container sx={{ ...sx }} maxWidth="lg">
      <Typography variant="body1" fontWeight={600} color={theme.palette.primary.main} textTransform="uppercase">
        Learn More about KLASMA
      </Typography>
      <Box mt={5}>
        <Grid container spacing={2}>
          {
            DATA.map(dataItem => (
              <Grid item xs={6} sm={4} md={3} key={dataItem.id}>
                <LearnMoreCard dataItem={dataItem} />
              </Grid>
            ))
          }

        </Grid>
      </Box>
    </Container>
  )
}