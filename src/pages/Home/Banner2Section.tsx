import { Box, Container, useTheme } from "@mui/material";
import SectionTitle from "../../components/SectionTitle";
import { ISxProps } from "../../utils/interfaces";

export default function Banner2Section({ sx }: ISxProps) {
  const theme = useTheme()
  return (
    <Box bgcolor={theme.palette.secondary.dark} py={8} sx={{ ...sx }}>
      <Container maxWidth="lg">
        <SectionTitle 
          title="Who's talking about Klasma?"
        />
        <Box 
          component="img"
          src="/assets/images/who.png"
          width="100%"
        />
      </Container>
    </Box>
  )
}