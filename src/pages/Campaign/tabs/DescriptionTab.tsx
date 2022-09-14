import { Box } from "@mui/material";
import parse from 'html-react-parser';

interface IProps {
  description: string;
}

export default function DescriptionTab({ description }: IProps) {
  return (
    <Box>
      {parse(description)}
    </Box>
  )
}