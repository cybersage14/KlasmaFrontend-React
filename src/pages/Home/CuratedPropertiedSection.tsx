import { Box, Container } from "@mui/material";
import Carousel from "../../components/Carousel";
import InvestCard from "../../components/InvestCard";
import SectionTitle from "../../components/SectionTitle";
import { IInvestDataItem } from "../../utils/interfaces";

const SLIDE_SETTINGS = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 9000,
  responsive: [
    {
      breakpoint: 1280,
      settings: { slidesToShow: 4 }
    },
    {
      breakpoint: 1024,
      settings: { slidesToShow: 3 }
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

export default function CuratedPropertiedSection() {
  return (
    <Box mt={12}>
      <Container maxWidth="xl">
        <SectionTitle
          title="Our Curated Propertied"
          description="Invest large or small. Earn rent weekly. Sell whenever."
        />
        <Box mt={5}>
          <Carousel
            slideSettings={SLIDE_SETTINGS}
            carouselItemComponent={InvestCard}
            data={INVEST_DATA}
            arrowsVisible={false}
          />
        </Box>
      </Container>
    </Box>
  )
}