import { Avatar, Box, Grid, Typography } from "@mui/material";

export default function ViewMode() {

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
              Tatiana Nabka
            </Typography>

            {/* Bio */}
            <Typography variant="body1" mt={1}>
              Web | Blockchain developer with proven 5 years professional experiences at a few companies. Seeking new improvement, high quality, fast pace and perfect result in every project. Powerful ability to break obstacles. Modest when learn new, Confident when use new. Serious to manage time, to make promise.
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
              admin@123.com
            </Typography>
          </Grid>

          {/* Phone */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={700}>
              Phone
            </Typography>
            <Typography variant="body1">
              +1234567890
            </Typography>
          </Grid>

          {/* Date of birth */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={700}>
              Date of birth
            </Typography>
            <Typography variant="body1">
              01/01/1999
            </Typography>
          </Grid>

          {/* Location */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={700}>
              Location
            </Typography>
            <Typography variant="body1">
              816 Portland Ave, Minneapolis, MN, United States
            </Typography>
          </Grid>

          {/* Postal Code */}
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" fontWeight={700}>
              Postal Code
            </Typography>
            <Typography variant="body1">
              55404
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}