import { Icon } from "@iconify/react";
import { Button, Container, Stack } from "@mui/material";
import { useState } from "react";
import EditMode from "./EditMode";
import ViewMode from "./ViewMode";

export default function UserProfile() {
  const [isViewMode, setIsViewMode] = useState(true)

  const handleViewMode = () => {
    setIsViewMode(!isViewMode)
  }

  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="end">
        {
          isViewMode ? (
            <Button
              startIcon={<Icon icon="ant-design:edit-filled" />}
              variant="outlined"
              onClick={handleViewMode}
            >
              Edit Profile
            </Button>
          ) : (
            <Button
              startIcon={<Icon icon="carbon:view-filled" />}
              variant="outlined"
              onClick={handleViewMode}
            >
              View Profile
            </Button>
          )
        }
      </Stack>
      {isViewMode ? <ViewMode /> : <EditMode />}
    </Container>
  )
}