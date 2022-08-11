import { useMemo } from "react";
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
import { IPropsOfInvestCard } from "../utils/interfaces"
import { showFirstLetters } from '../utils/functions'
import { Link as RouterLink } from "react-router-dom";
import InvestProgress from "./InvestProgress";

export default function InvestCard({ dataItem }: IPropsOfInvestCard) {
  const theme = useTheme();

  const title = useMemo(() => {
    return showFirstLetters(dataItem.title, 15)
  }, [dataItem.title])

  return (
    <Card sx={{ height: '99%', mx: 1 }}>
      <CardMedia
        component="img"
        src={dataItem.thumbnail}
        alt={title}
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
        <InvestProgress raised={dataItem.raised} goal={dataItem.goal} />
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={900}
          color={theme.palette.primary.main}
        >
          {dataItem.raised / dataItem.goal * 100} %
        </Typography>
        <Button
          sx={{ mt: 2 }}
          fullWidth
          variant="contained"
          component={RouterLink}
          to="/campaigns/1"
        >
          Go to invest
        </Button>
      </CardContent>
    </Card>
  )
}