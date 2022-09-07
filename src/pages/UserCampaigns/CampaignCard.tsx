import { Link as RouterLink } from 'react-router-dom'
import { Icon } from "@iconify/react";
import { Card, CardActions, CardContent, CardHeader, IconButton, Typography, useTheme } from "@mui/material";
import parse from 'html-react-parser'
import { ICampaign } from "../../utils/interfaces";
import { showFirstLetters } from '../../utils/functions';

interface IProps {
  campaign: ICampaign
}

export default function CampaignCard({ campaign }: IProps) {
  const theme = useTheme()
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
      <CardContent sx={{ pt: 0 }}>
        {parse(showFirstLetters(campaign.description, 100))}
      </CardContent>
      <CardActions>
        <Typography variant="body2"></Typography>
      </CardActions>
    </Card>
  )
}