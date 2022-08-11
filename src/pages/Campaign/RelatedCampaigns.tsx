import { Box, Typography } from "@mui/material";
import Carousel from "../../components/Carousel";
import InvestCard from "../../components/InvestCard";
import { IInvestDataItem, ISxProps } from "../../utils/interfaces";

const SLIDE_SETTINGS = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 9000,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 960,
      settings: { slidesToShow: 2 }
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 1, centerPadding: '0' }
    }
  ]
}

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
  }
]

export default function RelatedCampaigns({ sx }: ISxProps) {
  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Related Campaigns
      </Typography>
      <Carousel
        slideSettings={SLIDE_SETTINGS}
        carouselItemComponent={InvestCard}
        data={INVEST_DATA}
        arrowsVisible={false}
      />
    </Box>
  )
}