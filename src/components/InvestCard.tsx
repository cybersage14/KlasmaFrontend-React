import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Icon as MuiIcon,
  LinearProgress,
  Stack,
  Typography,
  useTheme
} from "@mui/material"
import { Icon } from "@iconify/react"
import { IPropsOfInvestCard } from "../utils/interfaces"

export default function InvestCard({ dataItem }: IPropsOfInvestCard) {
  const theme = useTheme();
  return (
    <Card sx={{ height: '99%', mx: 1 }}>
      <CardMedia
        component="img"
        src={dataItem.thumbnail}
        alt={dataItem.title}
      />
      <CardHeader
        title={dataItem.title}
        titleTypographyProps={{
          fontWeight: 700
        }}
        action={
          <MuiIcon color="success" sx={{ height: 'auto' }}>
            <Icon icon="fluent:presence-available-10-filled" />
          </MuiIcon>
        }
      />
      <CardContent>
        <LinearProgress
          value={dataItem.raised / dataItem.goal * 100}
          variant="determinate"
          color="primary"
        />
        <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
          <Typography variant="body1" fontWeight={600}>
            Raised: <Typography
              variant="body1"
              component="span"
              color={theme.palette.success.main}
              fontWeight="inherit"
            >
              ${dataItem.raised}
            </Typography>
          </Typography>
          <Typography variant="body1" fontWeight={600}>
            Goal: <Typography
              variant="body1"
              component="span"
              color={theme.palette.info.main}
              fontWeight="inherit"
            >
              ${dataItem.goal}
            </Typography>
          </Typography>
        </Stack>
        <Typography 
          variant="h4" 
          textAlign="center" 
          fontWeight={900} 
          color={theme.palette.primary.main}
        >
          {dataItem.raised / dataItem.goal * 100} %
        </Typography>
        <Button sx={{ mt: 2 }} fullWidth variant="contained">
          Go to invest
        </Button>
      </CardContent>
    </Card>
  )
}