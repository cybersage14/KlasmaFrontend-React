import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { Avatar, Box, Stack, Typography, useTheme, Icon as MuiIcon } from "@mui/material";
import { convertTimeForClientTimezone, fetchFirstLettersFromName, getVisibleDateTime } from "../utils/functions";
import { ICommentOfPost } from "../utils/interfaces";

interface IProps {
  commentItem: ICommentOfPost
}

export default function Testimonial({ commentItem }: IProps) {
  const theme = useTheme()
  const createdAt = useMemo(() => {
    if (commentItem.created_at) {
      let convertedDateTime = convertTimeForClientTimezone(commentItem.created_at)
      return getVisibleDateTime(convertedDateTime)
    }
  }, [commentItem.created_at])

  return (
    <Stack direction="row" spacing={3}>
      {
        commentItem.creator_image ? (
          <Avatar
            alt={commentItem.creator_name}
            src={commentItem.creator_image}
          />
        ) : (
          <Avatar
            sx={{ bgcolor: theme.palette.primary.main }}
          >{fetchFirstLettersFromName(commentItem.creator_name)}</Avatar>
        )
      }

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
          {commentItem.content}
        </Typography>
        <Stack direction="row" justifyContent="end" alignItems="center" mt={1}>
          <MuiIcon>
            <Icon icon="healthicons:i-schedule-school-date-time" />
          </MuiIcon>
          <Typography variant="body2">
            {createdAt}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  )
}