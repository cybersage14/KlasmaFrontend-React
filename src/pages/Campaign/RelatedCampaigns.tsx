import { Box, Typography } from "@mui/material";
import Carousel from "../../components/Carousel";
import CampaignCard from "../../components/CampaignCard";
import { ICampaign } from "../../utils/interfaces";

interface IProps {
  sx?: any;
  campaigns: Array<ICampaign>;
}

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

export default function RelatedCampaigns({ campaigns, sx }: IProps) {
  return (
    <Box sx={{ ...sx }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        Related Campaigns
      </Typography>
      <Carousel
        slideSettings={SLIDE_SETTINGS}
        carouselItemComponent={CampaignCard}
        data={campaigns}
        arrowsVisible={false}
      />
    </Box>
  )
}