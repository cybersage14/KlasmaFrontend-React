import { Box, Typography } from "@mui/material"
import { COLOR_PRIMARY, COLOR_PRIMARY_DARK } from "../utils/constants"
import { IPropsOfSectionTitle } from "../utils/interfaces"

export default function SectionTitle({ title, description }: IPropsOfSectionTitle) {
  return (
    <Box>
      <Typography textAlign="center" variant="h4" fontWeight={900} color={COLOR_PRIMARY}>
        {title}
      </Typography>
      {
        description && (
          <Typography textAlign="center" variant="h6" color={COLOR_PRIMARY_DARK}>
            {description}
          </Typography>
        )
      }
    </Box>
  )
}