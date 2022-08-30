import { Avatar, Box, Grid, Typography } from "@mui/material";
import useAuth from "../../hooks/useAuth";

export default function ViewMode() {
  const { currentUser } = useAuth()

  return (
    <Box>
      <Box>
        <Grid container spacing={2}>
          {/* Avatar */}
          <Grid item xs={12} sm={3}>
            <Avatar
              src="/assets/images/Wendy.png"
              sx={{ width: 120, height: 120 }}
            />
          </Grid>

          <Grid item xs={12} sm={9}>
            {/* Name */}
            <Typography variant="h5" fontWeight={700}>
              {currentUser?.first_name} {currentUser?.last_name}
            </Typography>

            {/* Bio */}
            <Typography variant="body1" mt={1}>
              {currentUser?.bio}
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box mt={3}>
        <Grid container spacing={2}>
          {/* Email */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={700}>
              Email
            </Typography>
            <Typography variant="body1">
              {currentUser?.email}
            </Typography>
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={700}>
              Phone
            </Typography>
            <Typography variant="body1">
              {currentUser?.phone}
            </Typography>
          </Grid>

          {/* Date of birth */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={700}>
              Date of birth
            </Typography>
            <Typography variant="body1">
              {currentUser?.date_of_birth}
            </Typography>
          </Grid>

          {/* Location */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={700}>
              Location
            </Typography>
            <Typography variant="body1">
              {currentUser?.address} {currentUser?.city} {currentUser?.state} {currentUser?.country}
            </Typography>
          </Grid>

          {/* Postal Code */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={700}>
              Postal Code
            </Typography>
            <Typography variant="body1">
              {currentUser?.postal_code}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}