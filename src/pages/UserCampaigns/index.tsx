import { Icon } from "@iconify/react";
import { Button, Container, Stack } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';

export default function UserCampaigns() {
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="end">
        <Button
          variant="contained"
          startIcon={<Icon icon="fluent:add-12-filled" />}
          component={RouterLink}
          to="/account-manage/campaigns/new"
        >
          New campaign
        </Button>
      </Stack>
    </Container>
  )
}