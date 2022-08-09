import { Box, Grid } from "@mui/material";
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
export default function GridView({ sx }: ISxProps) {
  return (
    <Box sx={{ ...sx }}>
      <Grid container spacing={1}>
        {
          DATA.map((dataItem, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <LearnMoreCard
                dataItem={dataItem}
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}