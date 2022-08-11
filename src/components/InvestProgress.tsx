import { LinearProgress, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface IPropsOfInvestProgress {
  sx?: object;
  raised: number;
  goal: number;
}

export default function InvestProgress({ sx, raised, goal }: IPropsOfInvestProgress) {
  return (
    <Stack spacing={1} sx={{ ...sx }}>
      <LinearProgress
        value={raised / goal * 100}
        variant="determinate"
        color="primary"
      />
      <Stack direction="row" justifyContent="space-between" alignItems="center" mt={3}>
        <Typography variant="body1" fontWeight={500}>
          Raised: <Typography
            variant="body1"
            component="span"
            fontWeight={900}
          >
            ${raised}
          </Typography>
        </Typography>
        <Typography variant="body1" fontWeight={500} color={grey[500]}>
          Goal: <Typography
            variant="body1"
            component="span"
            fontWeight={700}
          >
            ${goal}
          </Typography>
        </Typography>
      </Stack>
    </Stack>
  )
}