import { useEffect } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Container, Stack } from "@mui/material"
import { Icon } from '@iconify/react'
import useAuth from '../../hooks/useAuth'
import usePost from '../../hooks/usePost'
import NoData from '../../components/NoData'
import UserPostCard from './UserPostCard'

export default function UserPosts() {
  const { currentUser } = useAuth()
  const { posts, getPostsByUserIdAct } = usePost()

  useEffect(() => {
    if (currentUser?.id_user) {
      getPostsByUserIdAct(currentUser.id_user)
    }
  }, [])

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="end">
        <Button
          variant="contained"
          startIcon={<Icon icon="fluent:add-12-filled" />}
          component={RouterLink}
          to="/account-manage/posts/new"
        >
          New post
        </Button>
      </Stack>
      {
        posts.length > 0 ? (
          <Stack spacing={2} mt={2}>
            {
              posts.map(post => (
                <UserPostCard key={post.id} post={post} />
              ))
            }
          </Stack>
        ) : (
          <NoData text="No post" />
        )
      }
    </Container>
  )
}