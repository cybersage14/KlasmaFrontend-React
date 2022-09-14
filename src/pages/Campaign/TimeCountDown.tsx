import { Box, Card, Grid, Stack, Typography } from "@mui/material";
import { COLOR_PRIMARY, COLOR_WHITE } from "../../utils/constants";

interface IProps {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function TimeCountDown({ days, hours, minutes, seconds }: IProps) {
  
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ bgcolor: COLOR_PRIMARY, py: 1 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ color: COLOR_WHITE }}
            >
              <Typography variant="h6" fontWeight={900} textAlign="center">
                {days}
              </Typography>
              <Typography variant="body1" textAlign="center">
                Days
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ bgcolor: COLOR_PRIMARY, py: 1 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ color: COLOR_WHITE }}
            >
              <Typography variant="h6" fontWeight={900} textAlign="center">
                {hours}
              </Typography>
              <Typography variant="body1" textAlign="center">
                Hours
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ bgcolor: COLOR_PRIMARY, py: 1 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ color: COLOR_WHITE }}
            >
              <Typography variant="h6" fontWeight={900} textAlign="center">
                {minutes}
              </Typography>
              <Typography variant="body1" textAlign="center">
                Min
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ bgcolor: COLOR_PRIMARY, py: 1 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ color: COLOR_WHITE }}
            >
              <Typography variant="h6" fontWeight={900} textAlign="center">
                {seconds}
              </Typography>
              <Typography variant="body1" textAlign="center">
                Sec
              </Typography>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}