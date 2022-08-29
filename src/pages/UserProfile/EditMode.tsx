import { Box, Grid } from "@mui/material";
import UploadAvatar from "../../components/UploadAvatar";

export default function EditMode() {
  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={3}>
          <UploadAvatar />
        </Grid>

        <Grid item xs={12} sm={9}>

        </Grid>
      </Grid>
    </Box>
  )
}