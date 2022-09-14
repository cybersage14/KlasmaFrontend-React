import { useEffect } from 'react';
import { Box } from "@mui/material";
import useCampaign from "../../hooks/useCampaign";
import Banner1Section from "./Banner1Section";
import Banner2Section from "./Banner2Section";
import CuratedPropertiedSection from "./CuratedPropertiedSection";
import GrowSection from "./GrowSection";
import HeroSection from "./HeroSection";
import LearnMoreSection from "./LearnMoreSection";
import RentSection from "./RentSection";
import TokeninsingSection from "./TokeninsingSection";


export default function Home() {
  const { campaigns, getAllCampaignsAct } = useCampaign()

  useEffect(() => {
    getAllCampaignsAct()
  }, [])
  
  return (
    <Box>
      <HeroSection />
      <CuratedPropertiedSection campaigns={campaigns} sx={{ mt: 12 }} />
      <Banner1Section sx={{ mt: 12 }} />
      <GrowSection sx={{ mt: 12 }} />
      <RentSection sx={{ mt: 12 }} />
      <Banner2Section sx={{ mt: 20 }} />
      <TokeninsingSection sx={{ mt: 10 }} />
      <LearnMoreSection sx={{ my: 12 }} />
    </Box>
  )
}