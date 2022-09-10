import { Box, Typography } from "@mui/material";
import parse from 'html-react-parser';

interface IProps {
  description: string;
}

export default function DescriptionTab({ description }: IProps) {
  return (
    <Box>
      <Typography>
        {parse(description)}
      </Typography>
    </Box>
  )
}