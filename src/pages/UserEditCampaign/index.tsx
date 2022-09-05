import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { IFaq } from '../../utils/interfaces';
import CardFaq from './CardFaq';
import EditFaq from './EditFaq';

const validSchema = yup.object().shape({
  title: yup.string().required('Title is required.'),
  goalPrice: yup.string().required('Goal price is required.')
});

export default function UserEditCampaign() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [thumbnail, setThumbnail] = useState<File | string | null>(null)
  const [medias, setMedias] = useState<Array<File | string>>([])
  const [faqs, setFaqs] = useState<Array<IFaq>>([])
  const [visibleEditFaq, setVisibleEditFaq] = useState(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      goalPrice: ''
    },
    validationSchema: validSchema,
    onSubmit: (values) => {
      let description = draftToHtml(convertToRaw(editorState.getCurrentContent()))
      console.log('>>>>> description => ', description)
    }
  })

  const handleEditorState = (_editorState: EditorState) => {
    setEditorState(_editorState)
  }

  //  Upload a single thumbnail image
  const uploadThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files?.length) {
      if (e.target.files.length > 0) {
        setThumbnail(e.target.files[0])
      }
    }
  }

  // Select the multiple medias
  const uploadMedias = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setMedias([
        ...medias,
        ...Array.from(e?.target?.files).map((media) => media)
      ]);
    }
  };

  //  Remove a media
  const removeMedia = (index: number) => {
    const cloneOfMedias = [...medias];
    cloneOfMedias.splice(index, 1);
    setMedias(cloneOfMedias);
  }

  const addFaq = (faq: IFaq) => {
    setFaqs([...faqs, faq])
    setVisibleEditFaq(false)
  }

  const removeFaq = (index: number) => {
    let cloneOfFaqs = [...faqs]
    cloneOfFaqs.splice(index, 1)
    setFaqs(cloneOfFaqs)
  }

  const updateFaq = (updatedFaq: IFaq, index: number) => {
    let cloneOfFaqs = [...faqs]
    cloneOfFaqs.splice(index, 1, updatedFaq)
    setFaqs(cloneOfFaqs)
  }

  const openFaqAddForm = () => {
    setVisibleEditFaq(true)
  }
  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Stack spacing={4}>
        {/* Title */}
        <TextField
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={
            formik.touched.title && formik.errors.title ? (
              <Typography
                component="span"
                sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
              >
                <Icon icon="bxs:error-alt" />&nbsp;
                {formik.touched.title && formik.errors.title}
              </Typography>
            ) : (<></>)
          }
          fullWidth
        />

        {/* Description */}
        <FormControl>
          <FormLabel id="description">Description</FormLabel>
          <Editor
            aria-labelledby="description"
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={handleEditorState}
          />
        </FormControl>

        <TextField
          type="number"
          name="goalPrice"
          label="Goal price"
          InputProps={{
            startAdornment: <Icon icon="bi:currency-dollar" />
          }}
          value={formik.values.goalPrice}
          onChange={formik.handleChange}
          error={formik.touched.goalPrice && Boolean(formik.errors.goalPrice)}
          helperText={
            formik.touched.goalPrice && formik.errors.goalPrice ? (
              <Typography
                component="span"
                sx={{ display: 'flex', alignItems: 'center', mx: 0 }}
              >
                <Icon icon="bxs:error-alt" />&nbsp;
                {formik.touched.goalPrice && formik.errors.goalPrice}
              </Typography>
            ) : (<></>)
          }
          fullWidth
        />

        {/* Thumbnail */}
        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Stack direction="row" alignItems="center" spacing={2}>
            {
              thumbnail && (
                <Box position="relative">
                  <Paper
                    elevation={3}
                    sx={{ width: 128, height: 84, objectFit: 'cover' }}
                    component="img"
                    src={
                      thumbnail instanceof Object
                        ? URL.createObjectURL(thumbnail)
                        : thumbnail
                    }
                  />
                  <IconButton
                    sx={{ position: 'absolute', top: -10, right: -10 }}
                    onClick={() => setThumbnail(null)}
                  >
                    <Icon icon="ic:round-cancel" />
                  </IconButton>
                </Box>
              )
            }
            <Button
              variant="outlined"
              startIcon={<Icon icon="entypo:upload-to-cloud" />}
              component="label"
            >
              Upload
              <input type="file" accept="image/*" hidden onChange={uploadThumbnail} />
            </Button>
          </Stack>
        </FormControl>

        {/* Media */}
        <FormControl>
          <FormLabel>Media</FormLabel>
          <Stack direction="row" alignItems="center" spacing={2}>
            {medias.map((media, index) => (
              <Box key={index} position="relative">
                <Paper
                  component="img"
                  src={
                    media instanceof Object
                      ? URL.createObjectURL(media)
                      : media
                  }
                  elevation={3}
                  sx={{ width: 128, height: 84, objectFit: 'cover' }}
                />
                <IconButton
                  sx={{ position: 'absolute', top: -10, right: -10 }}
                  onClick={() => removeMedia(index)}
                >
                  <Icon icon="ic:round-cancel" />
                </IconButton>
              </Box>
            ))}
            <Button
              variant="outlined"
              startIcon={<Icon icon="entypo:upload-to-cloud" />}
              component="label"
            >
              Upload
              <input type="file" accept="image/*" hidden multiple onChange={uploadMedias} />
            </Button>
          </Stack>
        </FormControl>

        {/* Faq */}
        <FormControl>
          <FormLabel>FAQs</FormLabel>
          <Stack spacing={2}>
            {
              faqs.map((faq, index) => (
                <CardFaq index={index} faq={faq} removeFaq={removeFaq} updateFaq={updateFaq} />
              ))
            }
            {
              visibleEditFaq && (
                <EditFaq handleSave={addFaq} closeForm={() => setVisibleEditFaq(false)} />
              )
            }
            <Button
              variant="outlined"
              fullWidth
              startIcon={<Icon icon="bxs:add-to-queue" />}
              onClick={openFaqAddForm}
            >
              Add a FAQ
            </Button>
          </Stack>
        </FormControl>
        <Button variant="contained" fullWidth onClick={() => formik.handleSubmit()}>
          Save campaign
        </Button>
      </Stack>
    </Container>
  )
}