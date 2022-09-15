import { Link as RouterLink } from 'react-router-dom'
import { Button, Container, Stack } from "@mui/material"
import { Icon } from '@iconify/react'

export default function UserPosts() {
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
      {/* {
        campaigns.length > 0 ? (
          <Stack spacing={2} mt={2}>
            {
              campaigns.map(campaign => (
                <UserCampaignCard key={campaign.id} campaign={campaign} />
              ))
            }
          </Stack>
        ) : (
          <NoData text="No campaign" />
        )
      } */}
    </Container>
  )
}