import { Box } from "@mui/material";
import Banner1Section from "./Banner1Section";
import Banner2Section from "./Banner2Section";
import CuratedPropertiedSection from "./CuratedPropertiedSection";
import GrowSection from "./GrowSection";
import HeroSection from "./HeroSection";
import RentSection from "./RentSection";


export default function Home() {
  return (
    <Box>
      <HeroSection />
      <CuratedPropertiedSection sx={{ mt: 12 }} />
      <Banner1Section sx={{ mt: 12 }} />
      <GrowSection sx={{ mt: 12 }} />
      <RentSection sx={{ mt: 12 }} />
      <Banner2Section sx={{ mt: 20 }} />
    </Box>
  )
}