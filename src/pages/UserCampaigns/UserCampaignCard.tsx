import { useMemo } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Icon } from "@iconify/react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Stack,
  Typography,
  useTheme
} from "@mui/material";
import parse from 'html-react-parser'
import { ICampaign } from "../../utils/interfaces";
import {
  convertTimeForClientTimezone,
  getVisibleDateTime,
  showFirstLetters
} from '../../utils/functions';
import { PRE_THUMBNAIL } from '../../utils/constants';

interface IProps {
  campaign: ICampaign
}

export default function UserCampaignCard({ campaign }: IProps) {
  const theme = useTheme()

  const campaignCreatedAt = useMemo(() => {
    if (campaign?.created_at) {
      let convertedDateTime = convertTimeForClientTimezone(campaign.created_at)
      return getVisibleDateTime(convertedDateTime)
    }
  }, [campaign?.created_at])

  return (
    <Card>
      <CardHeader
        title={showFirstLetters(campaign.title, 20)}
        titleTypographyProps={{
          variant: 'h6',
          fontWeight: 700
        }}
        action={
          <IconButton
            sx={{ color: theme.palette.primary.main }}
            component={RouterLink}
            to={`/account-manage/campaigns/edit/${campaign.id}`}
          >
            <Icon icon="akar-icons:edit" />
          </IconButton>
        }
      />
      <CardContent sx={{ py: 0 }}>
        <Stack direction="row" spacing={2}>
          <Box
            component="img"
            src={campaign.thumbnail || PRE_THUMBNAIL}
            width={200}
            height={170}
            sx={{ objectFit: 'cover' }}
            alt=""
          />
          <Box>
            {parse(showFirstLetters(campaign.description, 100))}
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Icon icon="bxs:time" />
          <Typography component="span" variant="body2">
            {campaignCreatedAt}
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  )
}