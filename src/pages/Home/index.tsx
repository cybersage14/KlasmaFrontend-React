import { Box } from "@mui/material";
import CuratedPropertiedSection from "./CuratedPropertiedSection";
import HeroSection from "./HeroSection";


export default function Home() {
  return (
    <Box>
      <HeroSection />
      <CuratedPropertiedSection />
    </Box>
  )
}