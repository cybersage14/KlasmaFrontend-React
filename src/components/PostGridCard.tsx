import { useMemo } from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Icon as MuiIcon,
  CardMedia,
  Stack,
  Typography
} from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import parse from 'html-react-parser'
import {
  convertTimeForClientTimezone,
  getVisibleDateTime,
  showFirstLetters
} from '../utils/functions'
import { IPost } from '../utils/interfaces'
import { Icon } from '@iconify/react'

interface IProps {
  dataItem: IPost
}

export default function PostGridCard({ dataItem }: IProps) {
  const title = useMemo(() => {
    return showFirstLetters(dataItem.title, 10)
  }, [dataItem.title])

  const description = useMemo(() => {
    return showFirstLetters(dataItem.description, 25)
  }, [dataItem.description])

  const createdAt = useMemo(() => {
    if (dataItem.created_at) {
      let convertedDateTime = convertTimeForClientTimezone(dataItem.created_at)
      return getVisibleDateTime(convertedDateTime)
    }
  }, [dataItem.created_at])

  return (
    <Card>
      <CardMedia
        component="img"
        src="/assets/images/learn-more.png"
        alt="learn more"
      />
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={1} mb={1}>
          <Icon icon="bxs:time" />
          <Typography component="span" variant="body2">
            {createdAt}
          </Typography>
        </Stack>

        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>

        {parse(description)}
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          component={RouterLink}
          to={`/posts/${dataItem.id}`}
          variant="contained"
        >
          Read more
        </Button>
        <Stack direction="row" alignItems="center" spacing={1} mr={1}>
          <MuiIcon color="primary">
            <Icon icon="icon-park-solid:like" />
          </MuiIcon>
          <Typography variant="body2" component="span">
            0
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  )
}