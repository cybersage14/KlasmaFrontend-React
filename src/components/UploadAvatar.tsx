import { Icon } from "@iconify/react";
import { Avatar, Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { fetchFirstLettersFromName } from "../utils/functions";

interface IProps {
  avatarUrl: string;
  selectAvatar: Function;
}

export default function UploadAvatar({ selectAvatar, avatarUrl }: IProps) {
  const theme = useTheme()
  const { currentUser } = useAuth()
  const [visibleUploadButton, setVisibleUploadButton] = useState(false)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    selectAvatar(e)
  }

  return (
    <Paper
      sx={{ width: 120, height: 120, borderRadius: '50%', position: 'relative' }}
      onMouseEnter={() => setVisibleUploadButton(true)}
      onMouseLeave={() => setVisibleUploadButton(false)}
    >
      <Stack
        sx={{
          background: 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7) )',
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: '50%',
          cursor: 'pointer'
        }}
        justifyContent="center"
        position="absolute"
        top={0}
        component="label"
        display={visibleUploadButton ? 'flex' : 'none'}
        zIndex={10}
      >
        <Box>
          <Stack direction="row" justifyContent="center" sx={{ color: 'white' }}>
            <Icon icon="ic:round-add-a-photo" />
          </Stack>
          <Typography color="white" variant="body2" textAlign="center">Select</Typography>
        </Box>
        <input hidden accept="image/*" type="file" onChange={handleFile} />
      </Stack>

      {
        avatarUrl ? (
          <Avatar
            src={avatarUrl}
            alt=""
            sx={{ width: 120, height: 120, zIndex: 1 }}
          />
        ) : (
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 120,
              height: 120,
              fontSize: 36,
              zIndex: 1
            }}
          >
            {fetchFirstLettersFromName(`${currentUser?.first_name} ${currentUser?.last_name}`)}
          </Avatar>
        )
      }
    </Paper>
  )
}