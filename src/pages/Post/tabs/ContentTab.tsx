import { Box } from "@mui/material";
import parse from 'html-react-parser'

interface IProps {
  content: string;
}

export default function ContentTab({ content }: IProps) {
  return (
    <Box>
      {parse(content)}
    </Box>
  )
}