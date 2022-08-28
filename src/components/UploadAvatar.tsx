import { Icon } from "@iconify/react";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useMemo, useState } from "react";

export default function UploadAvatar() {
  const [file, setFile] = useState<File | null>(null)
  const [visibleUploadButton, setVisibleUploadButton] = useState(false)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      if (e.target.files.length > 0) {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
      }
    }
  }

  const fileUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
  }, [file])

  return (
    <Paper
      sx={{ width: 150, height: 150, borderRadius: '50%', position: 'relative' }}
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
      >
        <Box>
          <Stack direction="row" justifyContent="center" sx={{ color: 'white' }}>
            <Icon icon="ic:round-add-a-photo" />
          </Stack>
          <Typography color="white" variant="body2" textAlign="center">Upload</Typography>
        </Box>
        <input hidden accept="image/*" type="file" onChange={handleFile} />
      </Stack>

      <Box
        component="img"
        src={fileUrl}
        alt=""
        width="100%"
        height="100%"
        borderRadius="50%"
      />
    </Paper>
  )
}