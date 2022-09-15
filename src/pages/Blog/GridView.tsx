import { Box, Grid } from "@mui/material";
import PostGridCard from "../../components/PostGridCard";
import { IPost } from "../../utils/interfaces";

interface IProps {
  sx?: any;
  posts: Array<IPost>
}

export default function GridView({ sx, posts }: IProps) {
  return (
    <Box sx={{ ...sx }}>
      <Grid container spacing={1}>
        {
          posts.map(dataItem => (
            <Grid item xs={12} sm={6} md={3} key={dataItem.id}>
              <PostGridCard
                dataItem={dataItem}
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}