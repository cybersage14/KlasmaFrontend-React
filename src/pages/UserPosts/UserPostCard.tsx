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
import { IPost } from "../../utils/interfaces";
import {
  convertTimeForClientTimezone,
  getVisibleDateTime,
  showFirstLetters
} from '../../utils/functions';
import { PRE_THUMBNAIL } from '../../utils/constants';

interface IProps {
  post: IPost
}

export default function UserPostCard({ post }: IProps) {
  const theme = useTheme()

  const postCreatedAt = useMemo(() => {
    if (post?.created_at) {
      let convertedDateTime = convertTimeForClientTimezone(post.created_at)
      return getVisibleDateTime(convertedDateTime)
    }
  }, [post?.created_at])

  return (
    <Card>
      <CardHeader
        title={showFirstLetters(post.title, 20)}
        titleTypographyProps={{
          variant: 'h6',
          fontWeight: 700
        }}
        action={
          <IconButton
            sx={{ color: theme.palette.primary.main }}
            component={RouterLink}
            to={`/account-manage/posts/edit/${post.id}`}
          >
            <Icon icon="akar-icons:edit" />
          </IconButton>
        }
      />
      <CardContent sx={{ py: 0 }}>
        <Stack direction="row" spacing={2}>
          <Box
            component="img"
            src={post.thumbnail || PRE_THUMBNAIL}
            width={200}
            height={170}
            sx={{ objectFit: 'cover' }}
            alt=""
          />
          <Box>
            {parse(showFirstLetters(post.description, 100))}
          </Box>
        </Stack>
      </CardContent>
      <CardActions sx={{ justifyContent: 'end' }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Icon icon="bxs:time" />
          <Typography component="span" variant="body2">
            {postCreatedAt}
          </Typography>
        </Stack>
      </CardActions>
    </Card>
  )
}