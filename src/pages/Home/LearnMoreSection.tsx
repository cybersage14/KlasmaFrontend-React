import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import PostGridCard from "../../components/PostGridCard";
import { IPost } from "../../utils/interfaces";

interface IProps {
  sx?: any;
  posts: Array<IPost>
}

export default function LearnMoreSection({ sx, posts }: IProps) {
  const theme = useTheme()
  return (
    <Container sx={{ ...sx }} maxWidth="lg">
      <Typography variant="body1" fontWeight={600} color={theme.palette.primary.main} textTransform="uppercase">
        Learn More about KLASMA
      </Typography>
      <Box mt={5}>
        <Grid container spacing={2}>
          {
            posts.map(dataItem => (
              <Grid item xs={6} sm={4} md={3} key={dataItem.id}>
                <PostGridCard dataItem={dataItem} />
              </Grid>
            ))
          }
        </Grid>
      </Box>
    </Container>
  )
}