import { Icon } from "@iconify/react";
import { Avatar, Card, CardActions, CardContent, IconButton, Link, Stack, Typography, useTheme } from "@mui/material";
import { ITeammateData } from '../utils/interfaces'

interface IProps {
  dataItem: ITeammateData;
}

export default function TeammateCard({ dataItem }: IProps) {
  const theme = useTheme()
  return (
    <Card>
      <Stack direction="row" justifyContent="center" pt={5}>
        <Avatar
          src={dataItem.avatar}
          alt={dataItem.name}
          sx={{ width: '70%', height: '70%' }}
        />
      </Stack>

      <CardContent>
        <Typography
          variant="h5"
          textAlign="center"
          fontWeight={700}
          color={theme.palette.primary.main}
        >{dataItem.name}</Typography>
        <Typography
          variant="h6"
          textAlign="center"
        >{dataItem.position}</Typography>
      </CardContent>

      <CardActions>
        <Stack direction="row" justifyContent="center" alignItems="center" width="100%">
          <IconButton
            component={Link}
            target="_blank"
            href={dataItem.facebookUrl}
            sx={{ color: theme.palette.primary.main }}
          >
            <Icon icon="akar-icons:facebook-fill" />
          </IconButton>
          <IconButton
            component={Link}
            target="_blank"
            href={dataItem.twitterUrl}
            sx={{ color: theme.palette.primary.main }}
          >
            <Icon icon="ant-design:twitter-circle-filled" />
          </IconButton>
          <IconButton
            component={Link}
            target="_blank"
            href={dataItem.instagramUrl}
            sx={{ color: theme.palette.primary.main }}
          >
            <Icon icon="ant-design:instagram-filled" />
          </IconButton>
        </Stack>
      </CardActions>
    </Card>
  )
}