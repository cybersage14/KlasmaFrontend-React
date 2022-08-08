import { Box, Grid } from "@mui/material";
import InvestCard from "../../components/InvestCard";
import { IInvestDataItem, ISxProps } from "../../utils/interfaces";

const INVEST_DATA: Array<IInvestDataItem> = [
  {
    title: 'On it differed repeated wandered required in',
    goal: 1000,
    raised: 240,
    thumbnail: '/assets/images/invest-card-sample-thumbnail.png'
  },
  {
    title: 'On it differed repeated wandered required in',
    goal: 1000,
    raised: 240,
    thumbnail: '/assets/images/invest-card-sample-thumbnail.png'
  },
  {
    title: 'On it differed repeated wandered required in',
    goal: 1000,
    raised: 240,
    thumbnail: '/assets/images/invest-card-sample-thumbnail.png'
  },
  {
    title: 'On it differed repeated wandered required in',
    goal: 1000,
    raised: 240,
    thumbnail: '/assets/images/invest-card-sample-thumbnail.png'
  },
  {
    title: 'On it differed repeated wandered required in',
    goal: 1000,
    raised: 240,
    thumbnail: '/assets/images/invest-card-sample-thumbnail.png'
  },
  {
    title: 'On it differed repeated wandered required in',
    goal: 1000,
    raised: 240,
    thumbnail: '/assets/images/invest-card-sample-thumbnail.png'
  }
]

export default function GridView({ sx }: ISxProps) {
  return (
    <Box sx={{ ...sx }}>
      <Grid container spacing={1}>
        {
          INVEST_DATA.map((dataItem, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <InvestCard
                dataItem={dataItem}
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}