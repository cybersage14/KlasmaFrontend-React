import { useState } from "react";
import { Icon } from "@iconify/react";
import { Button, Card, CardContent, CardHeader, IconButton, Stack, Typography } from "@mui/material";
import { IFaq } from "../../utils/interfaces";
import EditFaq from "./EditFaq";

interface IProps {
  index: number;
  faq: IFaq;
  removeFaq: Function;
  updateFaq: Function;
}

export default function CardFaq({ index, faq, removeFaq, updateFaq }: IProps) {
  const [editMode, setEditMode] = useState(false)

  const enableEditMode = () => {
    setEditMode(true)
  }

  const handleUpdateFaq = (faq: IFaq, index: number) => {
    updateFaq(faq, index)
    setEditMode(false)
  }

  return (
    <Card>
      <CardHeader
        action={
          <IconButton onClick={() => removeFaq(index)}>
            <Icon icon="ep:circle-close-filled" />
          </IconButton>
        }
      />
      {
        editMode ? (
          <CardContent>
            <EditFaq 
              index={index} 
              faq={faq} 
              handleSave={handleUpdateFaq} 
              closeForm={() => setEditMode(false)} 
            />
          </CardContent>
        ) : (
          <CardContent>
            <Typography variant="body1" fontWeight={700}>{faq.question}</Typography>
            <Typography variant="body1">{faq.answer}</Typography>
            <Stack direction="row" justifyContent="end">
              <Button
                startIcon={<Icon icon="akar-icons:edit" />}
                onClick={enableEditMode}
              >Edit</Button>
            </Stack>
          </CardContent>
        )
      }
    </Card>
  )
}