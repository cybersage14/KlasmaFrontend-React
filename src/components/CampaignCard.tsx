import { useMemo } from "react"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Icon as MuiIcon,
  Typography,
  useTheme
} from "@mui/material"
import { Icon } from "@iconify/react"
import { Link as RouterLink } from "react-router-dom"
import { showFirstLetters } from '../utils/functions'
import InvestProgress from "./InvestProgress"
import { ICampaign } from "../utils/interfaces"

interface IProps {
  dataItem: ICampaign;
}

export default function CampaignCard({ dataItem }: IProps) {
  const theme = useTheme();

  const title = useMemo(() => {
    return showFirstLetters(dataItem.title, 15)
  }, [dataItem.title])

  return (
    <Card sx={{ height: '99%', mx: 1 }}>
      <CardMedia
        component="img"
        src={dataItem.thumbnail || '/assets/images/invest-card-sample-thumbnail.png'}
        alt={title}
        height={180}
      />
      <CardHeader
        title={title}
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
        <InvestProgress raised={dataItem.raised_price} goal={dataItem.goal_price} />
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={900}
          color={theme.palette.primary.main}
        >
          {dataItem.raised_price / dataItem.goal_price * 100} %
        </Typography>
        <Button
          sx={{ mt: 2 }}
          fullWidth
          variant="contained"
          component={RouterLink}
          to={`/campaigns/${dataItem.id}`}
        >
          Go to invest
        </Button>
      </CardContent>
    </Card>
  )
}