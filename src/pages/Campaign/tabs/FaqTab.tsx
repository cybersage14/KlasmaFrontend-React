import { Icon } from "@iconify/react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";

const DATA = [
  {
    question: 'One for all and all for one,',
    answer: 'One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, it’s a pretty story. Sharing everything with fun, that’s the way to be. One for all and all for one, Muskehounds are always ready.'
  },
  {
    question: 'One for all and all for one,',
    answer: 'One for all and all for one, Muskehounds are always ready. One for all and all for one, helping everybody. One for all and all for one, it’s a pretty story. Sharing everything with fun, that’s the way to be. One for all and all for one, Muskehounds are always ready.'
  }
]

export default function FaqTab() {
  return (
    <Box>
      {
        DATA.map((dataItem, index) => (
          <Accordion key={index}>
            <AccordionSummary expandIcon={<Icon icon="material-symbols:expand-more-rounded" />}>
              <Typography
                fontSize={{ xs: 14, md: 18 }}
                textAlign="justify"
              >{dataItem.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                fontSize={{ xs: 14, md: 16 }}
                textAlign="justify"
              >{dataItem.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))
      }
    </Box>
  )
}