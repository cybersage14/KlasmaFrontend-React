import { Box, Container } from "@mui/material";
import SectionTitle from "../../components/SectionTitle";

export default function CuratedPropertiedSection() {
  return (
    <Box mt={12}>
      <Container maxWidth="xl">
        <SectionTitle
          title="Our Curated Propertied"
          description="Invest large or small. Earn rent weekly. Sell whenever."
        />
      </Container>
    </Box>
  )
}