import { Box, Container, Grid } from "@mui/material";
import UploadAvatar from "../../components/UploadAvatar";

export default function UserProfile() {
  return (
    <Container sx={{ py: 3 }}>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <UploadAvatar />
          </Grid>

          <Grid item xs={12} sm={9}>

          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}