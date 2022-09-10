import { Icon } from "@iconify/react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { IFaq } from "../../../utils/interfaces";

interface IProps {
  faqs: Array<IFaq>
}

export default function FaqTab({ faqs }: IProps) {
  return (
    <Box>
      {
        faqs.map((dataItem, index) => (
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