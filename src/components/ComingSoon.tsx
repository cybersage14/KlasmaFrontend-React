import { Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export default function ComingSoon() {
  return (
    <Typography
      variant="h4"
      fontWeight={900}
      color={grey[700]}
      textAlign="center"
      py={6}
    >
      Coming soon...
    </Typography>
  );
}