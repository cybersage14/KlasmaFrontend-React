import { Avatar, Button, Divider, Stack, TextField, Typography, useTheme } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import Testimonial from "../../../components/Testimonial";
import useAuth from "../../../hooks/useAuth";
import { fetchFirstLettersFromName } from "../../../utils/functions";
import useCampaign from "../../../hooks/useCampaign";

const validSchema = yup.object().shape({
  comment: yup.string().required('Please input some words.')
});

export default function CommentsTab() {
  const theme = useTheme()
  const { currentUser } = useAuth()
  const { campaign, commentsOfCampaign, saveCommentOfCampaignAct } = useCampaign()

  const formik = useFormik({
    initialValues: {
      comment: ''
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
      let { comment } = values;
      //  Create a new comment
      saveCommentOfCampaignAct({
        content: comment,
        id_campaign: campaign?.id,
        created_by: currentUser?.id_user
      })
    }
  })

  return (
    <Stack spacing={3}>
      <Stack spacing={2}>
        {
          commentsOfCampaign.length > 0 && (
            commentsOfCampaign.map(commentItem => (
              <Testimonial
                key={commentItem.id}
                commentItem={commentItem}
              />
            ))
          )
        }
      </Stack>

      {
        currentUser && (
          <>
            <Divider />

            <Stack direction="row" spacing={3}>
              {
                currentUser?.avatar ? (
                  <Avatar
                    src={currentUser?.avatar}
                    alt=""
                  />
                ) : (
                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                    {fetchFirstLettersFromName(`${currentUser?.first_name} ${currentUser?.last_name}`)}
                  </Avatar>
                )
              }

              <Stack spacing={1} flexGrow={1}>
                <TextField
                  name="comment"
                  placeholder="Comment here."
                  fullWidth
                  multiline
                  rows={5}
                  value={formik.values.comment}
                  onChange={formik.handleChange}
                  error={formik.touched.comment && Boolean(formik.errors.comment)}
                  helperText={
                    formik.touched.comment && formik.errors.comment ? (
                      <Typography
                        component="span"
                        sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
                      >
                        <Icon icon="bxs:error-alt" />&nbsp;
                        {formik.touched.comment && formik.errors.comment}
                      </Typography>
                    ) : (<></>)
                  }
                />
                <Stack direction="row" justifyContent="end">
                  <Button variant="contained" onClick={() => formik.handleSubmit()}>
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </>
        )
      }
    </Stack>
  )
}