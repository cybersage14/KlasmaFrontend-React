import { Icon } from "@iconify/react";
import { Avatar, Box, Stack, Typography, useTheme, Icon as MuiIcon } from "@mui/material";

export default function Testimonial() {
  const theme = useTheme()
  return (
    <Stack direction="row" spacing={3}>
      <Avatar
        sx={{ bgcolor: theme.palette.primary.main }}
      >N</Avatar>

      <Box position="relative" bgcolor="#cccccc" px={3} py={2} borderRadius={3} width="100%">
        <Box
          position="absolute"
          width={0}
          height={0}
          borderTop="20px solid #cccccc"
          borderLeft="20px solid transparent"
          left={-10}
          top={0}
        />
        <Typography variant="body1" textAlign="justify" sx={{ wordBreak: 'break-all' }}>
          weggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggregegewrgaweeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeergggggggggggggggggggggggggggggggggggggggggggggggggggg
        </Typography>
        <Stack direction="row" justifyContent="end" alignItems="center" mt={1}>
          <MuiIcon>
            <Icon icon="healthicons:i-schedule-school-date-time" />
          </MuiIcon>
          <Typography variant="body2">
            20:36 May 9, 2019
          </Typography>
        </Stack>
      </Box>
    </Stack>
  )
}