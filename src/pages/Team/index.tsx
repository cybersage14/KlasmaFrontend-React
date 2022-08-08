import { Box } from "@mui/material";
import HeroSection from "./HeroSection";
import MembersSection from "./MemebersSection";

export default function Team() {
  return (
    <Box>
      <HeroSection />
      <MembersSection sx={{ mt: 6, pb: 6 }} />
    </Box>
  )
}