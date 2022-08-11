import { Box, Card, Grid, Stack, Typography, useTheme } from "@mui/material";
import { COLOR_WHITE } from "../../utils/constants";

export default function TimeCountDown() {
  const theme = useTheme()
  return (
    <Box>
      <Grid container spacing={1}>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ bgcolor: theme.palette.primary.main, py: 1 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ color: COLOR_WHITE }}
            >
              <Typography variant="h6" fontWeight={900} textAlign="center">
                260
              </Typography>
              <Typography variant="body1" textAlign="center">
                Days
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ bgcolor: theme.palette.primary.main, py: 1 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ color: COLOR_WHITE }}
            >
              <Typography variant="h6" fontWeight={900} textAlign="center">
                14
              </Typography>
              <Typography variant="body1" textAlign="center">
                Hours
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ bgcolor: theme.palette.primary.main, py: 1 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ color: COLOR_WHITE }}
            >
              <Typography variant="h6" fontWeight={900} textAlign="center">
                43
              </Typography>
              <Typography variant="body1" textAlign="center">
                Min
              </Typography>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={3} sm={3} md={3}>
          <Card sx={{ bgcolor: theme.palette.primary.main, py: 1 }}>
            <Stack
              alignItems="center"
              justifyContent="center"
              spacing={1}
              sx={{ color: COLOR_WHITE }}
            >
              <Typography variant="h6" fontWeight={900} textAlign="center">
                12
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