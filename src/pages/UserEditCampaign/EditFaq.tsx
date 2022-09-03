import { useCallback, useMemo } from 'react';
import { Button, Stack, TextField, Typography } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { IFaq } from "../../utils/interfaces";

interface IProps {
  index?: number;
  faq?: IFaq;
  handleSave: Function;
  closeForm: Function;
}

const validSchema = yup.object().shape({
  question: yup.string().required('Question is required.'),
  answer: yup.string().required('Answer is required.')
});

export default function EditFaq({ index, faq, handleSave, closeForm }: IProps) {
  const initialValues = useMemo(() => {
    if (faq) {
      return {
        question: faq.question,
        answer: faq.answer
      }
    }
    return {
      question: '',
      answer: ''
    }
  }, [faq])

  const formik = useFormik({
    initialValues,
    validationSchema: validSchema,
    onSubmit: (values) => {
      saveFaq(values)
    }
  })

  //  Add a new faq or Update an existed faq
  const saveFaq = useCallback((faq: IFaq) => {
    if (index) {
      handleSave(faq, index)  //  Update an existed faq
    } else {
      handleSave(faq) //  Add a new faq
    }
  }, [index])

  return (
    <Stack spacing={2}>
      <TextField
        name="question"
        label="Question"
        value={formik.values.question}
        onChange={formik.handleChange}
        error={formik.touched.question && Boolean(formik.errors.question)}
        helperText={
          formik.touched.question && formik.errors.question ? (
            <Typography
              component="span"
              sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
            >
              <Icon icon="bxs:error-alt" />&nbsp;
              {formik.touched.question && formik.errors.question}
            </Typography>
          ) : (<></>)
        }
        fullWidth
      />

      <TextField
        multiline
        rows={3}
        name="answer"
        label="Answer"
        value={formik.values.answer}
        onChange={formik.handleChange}
        error={formik.touched.answer && Boolean(formik.errors.answer)}
        helperText={
          formik.touched.answer && formik.errors.answer ? (
            <Typography
              component="span"
              sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
            >
              <Icon icon="bxs:error-alt" />&nbsp;
              {formik.touched.answer && formik.errors.answer}
            </Typography>
          ) : (<></>)
        }
        fullWidth
      />

      <Stack direction="row" justifyContent="end" spacing={1}>
        <Button onClick={() => closeForm()}>Cancel</Button>
        <Button onClick={() => formik.handleSubmit()} variant="contained">Save</Button>
      </Stack>
    </Stack>
  )
}