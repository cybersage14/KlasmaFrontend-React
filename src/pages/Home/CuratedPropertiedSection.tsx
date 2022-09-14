import { Box, Container } from "@mui/material";
import Carousel from "../../components/Carousel";
import CampaignCard from "../../components/CampaignCard";
import SectionTitle from "../../components/SectionTitle";
import { ICampaign } from "../../utils/interfaces";

interface IProps {
  sx?: any;
  campaigns: Array<ICampaign>
}

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
      settings: { slidesToShow: 3 }
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

export default function CuratedPropertiedSection({ sx, campaigns }: IProps) {
  return (
    <Box sx={{ ...sx }}>
      <Container maxWidth="lg">
        <SectionTitle
          title="Our Curated Propertied"
          description="Invest large or small. Earn rent weekly. Sell whenever."
        />
        <Box mt={5}>
          <Carousel
            slideSettings={SLIDE_SETTINGS}
            carouselItemComponent={CampaignCard}
            data={campaigns}
            arrowsVisible={false}
          />
        </Box>
      </Container>
    </Box>
  )
}