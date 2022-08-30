import { useMemo } from 'react'
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import { showFirstLetters } from '../utils/functions'
import { ILearnMoreData } from '../utils/interfaces'

interface IProps {
  dataItem: ILearnMoreData
}

export default function LearnMoreCard({ dataItem }: IProps) {
  const title = useMemo(() => {
    return showFirstLetters(dataItem.title, 10)
  }, [dataItem.title])

  const description = useMemo(() => {
    return showFirstLetters(dataItem.description, 25)
  }, [dataItem.description])

  return (
    <Card>
      <CardMedia
        component="img"
        src="/assets/images/learn-more.png"
        alt="learn more"
      />
      <CardContent>
        <Typography variant="h6">
          {dataItem.date}
        </Typography>

        <Typography variant="h5" fontWeight={700}>
          {title}
        </Typography>

        <Typography variant="body1">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={`/posts/${dataItem.id}`}
        >
          Read more
        </Button>
      </CardActions>
    </Card>
  )
}