import { Box, Container, Grid } from "@mui/material";
import TeammateCard from "../../components/TeammateCard";
import { ISxProps } from "../../utils/interfaces";

const DATA = [
  {
    name: 'Jenny Doe',
    position: 'CEO',
    avatar: '/assets/images/Wendy.png',
    facebookUrl: '#',
    twitterUrl: '#',
    instagramUrl: '#'
  },
  {
    name: 'Jenny Doe',
    position: 'CEO',
    avatar: '/assets/images/Wendy.png',
    facebookUrl: '#',
    twitterUrl: '#',
    instagramUrl: '#'
  },
  {
    name: 'Jenny Doe',
    position: 'CEO',
    avatar: '/assets/images/Wendy.png',
    facebookUrl: '#',
    twitterUrl: '#',
    instagramUrl: '#'
  },
  {
    name: 'Jenny Doe',
    position: 'CEO',
    avatar: '/assets/images/Wendy.png',
    facebookUrl: '#',
    twitterUrl: '#',
    instagramUrl: '#'
  },
  {
    name: 'Jenny Doe',
    position: 'CEO',
    avatar: '/assets/images/Wendy.png',
    facebookUrl: '#',
    twitterUrl: '#',
    instagramUrl: '#'
  }
]

export default function MembersSection({ sx }: ISxProps) {
  return (
    <Container sx={{ ...sx }} maxWidth="lg">
      <Box>
        <Grid container spacing={2}>
          {
            DATA.map((dataItem, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <TeammateCard dataItem={dataItem} />
              </Grid>
            ))
          }

        </Grid>
      </Box>
    </Container>
  )
}