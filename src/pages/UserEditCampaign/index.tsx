import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'react-router';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import { Icon } from "@iconify/react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState, convertFromHTML } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { ICampaignReq, IFaq } from '../../utils/interfaces';
import CardFaq from './CardFaq';
import EditFaq from './EditFaq';
import { storage } from '../../utils/firebase';
import useLoading from '../../hooks/useLoading';
import { generateUniqueFileName, getIndexesOfBlobs } from '../../utils/functions';
import useAlertMessage from '../../hooks/useAlertMessage';
import { ERROR, MESSAGE_FILE_UPLOAD_FAILED } from '../../utils/constants';
import useCampaign from '../../hooks/useCampaign';
import useAuth from '../../hooks/useAuth';

interface IInitialValues {
  title: string;
  goalPrice: string;
}

const validSchema = yup.object().shape({
  title: yup.string().required('Title is required.'),
  goalPrice: yup.string().required('Goal price is required.'),
});

export default function UserEditCampaign() {
  const { mode, id } = useParams()
  const theme = useTheme()
  const { openLoading, closeLoading } = useLoading()
  const { openAlert } = useAlertMessage()
  const { campaign, saveCampaignAct, getCampaignByIdAct } = useCampaign()
  const { currentUser } = useAuth()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('')
  const [mediaFiles, setMediaFiles] = useState<Array<File>>([])
  const [mediaUrls, setMediaUrls] = useState<Array<string>>([])
  const [faqs, setFaqs] = useState<Array<IFaq>>([])
  const [visibleEditFaq, setVisibleEditFaq] = useState(false)
  const [closeAt, setCloseAt] = useState<Dayjs | null>()

  useEffect(() => {
    if (id) {
      getCampaignByIdAct(Number(id))
    }
  }, [id])

  useEffect(() => {
    if (id && campaign) {
      let blocks = convertFromHTML(campaign.description)
      setEditorState(EditorState.createWithContent(
        ContentState.createFromBlockArray(blocks.contentBlocks)
      ))

      setThumbnailUrl(campaign.thumbnail)
      setMediaUrls(campaign.medias)
      setFaqs(campaign.faqs)
      setCloseAt(dayjs(campaign.close_at))
    }
  }, [id, campaign])

  //  Page title by mode
  const pageTitle = useMemo(() => {
    if (mode === 'new') {
      return 'New campaign'
    }
    return 'Edit campaign'
  }, [mode])

  const formik = useFormik({
    initialValues: campaign ?
      {
        title: campaign.title,
        goalPrice: String(campaign.goal_price),
      }
      : {
        title: '',
        goalPrice: ''
      },
    validationSchema: validSchema,
    onSubmit: (values) => {
      const { title, goalPrice } = values
      let description = draftToHtml(convertToRaw(editorState.getCurrentContent()))

      const reqData: ICampaignReq = {
        id_company: currentUser?.id_company,
        goal_price: Number(goalPrice),
        title,
        faqs
      }

      if (closeAt) {
        reqData.close_at = closeAt.toDate()
      }

      if (description) {
        reqData.description = description
      }
      if (thumbnailUrl) {
        reqData.thumbnail = thumbnailUrl
      }
      reqData.medias = mediaUrls

      if (id) {
        saveCampaignAct(reqData, Number(id))
      } else {
        saveCampaignAct(reqData)
      }
    }
  })

  //  Upload thumbnail and medias onto firestore
  const uploadFiles = () => {
    let storageRef = null
    if (thumbnailFile) {
      if (thumbnailFile instanceof File) {
        openLoading()
        let fileName = generateUniqueFileName(thumbnailFile.name)
        storageRef = ref(storage, `/campaign_thumbnails/${fileName}`)
        let uploadProcess = uploadBytesResumable(storageRef, thumbnailFile)
        uploadProcess.on(
          'state_changed',
          (snapshot) => {
            let percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            console.log('>>>>> percentage of uploading thumbnail => ', percent)
          },
          error => {
            openAlert({
              severity: ERROR,
              message: MESSAGE_FILE_UPLOAD_FAILED
            })
            console.log(error)
          },
          () => {
            if (uploadProcess) {
              getDownloadURL(uploadProcess.snapshot.ref).then((url) => {
                setThumbnailUrl(url)
                setThumbnailFile(null)
                closeLoading()
              });
            }
          }
        )
      }
    }

    if (mediaFiles.length > 0) {
      openLoading()
      const indexesOfBlobUrls = getIndexesOfBlobs(mediaUrls)
      for (let i = 0; i < mediaFiles.length; i += 1) {
        let fileName = generateUniqueFileName(mediaFiles[i].name)
        storageRef = ref(storage, `/campaign_medias/${fileName}`)
        let uploadProcess = uploadBytesResumable(storageRef, mediaFiles[i])

        uploadProcess.on(
          'state_changed',
          (snapshot) => {
            // let percent = Math.round(
            //   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            // )
            // console.log('>>>>>>> percentage of media => ', percent)
          },
          error => {
            openAlert({
              severity: ERROR,
              message: MESSAGE_FILE_UPLOAD_FAILED
            })
            console.log(error)
          },
          () => {
            if (uploadProcess) {
              getDownloadURL(uploadProcess.snapshot.ref).then((url) => {
                mediaUrls.splice(indexesOfBlobUrls[i], 1, url)
                if (i === mediaFiles.length - 1) {
                  closeLoading()
                }
              });
            }
          }
        )
      }
      setMediaFiles([])
    }
  }

  //  Change description editor
  const handleEditorState = (_editorState: EditorState) => {
    setEditorState(_editorState)
  }

  //  Select a thumbnail image
  const selectThumbnailFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('>>>>> selectThumbnailFile')
    if (e?.target?.files) {
      setThumbnailFile(e.target.files[0])
      setThumbnailUrl(URL.createObjectURL(e.target.files[0]))
    }
  }

  // Select the multiple medias
  const selectUploadMediaFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e?.target?.files) {
      setMediaFiles([
        ...mediaFiles,
        ...Array.from(e?.target?.files).map((media) => media)
      ]);
      setMediaUrls([
        ...mediaUrls,
        ...Array.from(e?.target?.files).map((media) => URL.createObjectURL(media))
      ])
    }
  };

  //  Remove a media
  const removeMedia = (index: number) => {
    const cloneOfMediaFiles = [...mediaFiles]
    const cloneOfMediaUrls = [...mediaUrls]
    cloneOfMediaFiles.splice(index, 1)
    cloneOfMediaUrls.splice(index, 1)
    setMediaFiles(cloneOfMediaFiles)
    setMediaUrls(cloneOfMediaUrls)
  }

  //  Remove a thumbnail
  const removeThumbnail = () => {
    setThumbnailFile(null)
    setThumbnailUrl('')
  }

  //  Add a faq
  const addFaq = (faq: IFaq) => {
    setFaqs([...faqs, faq])
    setVisibleEditFaq(false)
  }

  //  Remove a faq
  const removeFaq = (index: number) => {
    let cloneOfFaqs = [...faqs]
    cloneOfFaqs.splice(index, 1)
    setFaqs(cloneOfFaqs)
  }

  //  Update a faq
  const updateFaq = (updatedFaq: IFaq, index: number) => {
    let cloneOfFaqs = [...faqs]
    cloneOfFaqs.splice(index, 1, updatedFaq)
    setFaqs(cloneOfFaqs)
  }

  //  Open form to add a faq
  const openFaqAddForm = () => {
    setVisibleEditFaq(true)
  }

  const handleSetCloseAt = (newValue: Dayjs | null) => {
    if (newValue) {
      let toDate = newValue.toDate()
      let currentDate = new Date()
      if (toDate > currentDate) {
        setCloseAt(newValue)
      }
    }
  }

  return (
    <Container maxWidth="sm" sx={{ py: 3 }}>
      <Typography variant="h5" fontWeight={700} textAlign="center">
        {pageTitle}
      </Typography>
      <Stack spacing={4} mt={3}>
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

        <Box>
          <Grid container spacing={2}>
            {/* Goal price */}
            <Grid item xs={12} sm={6}>
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
            </Grid>

            {/* Close at */}
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Close at"
                  value={closeAt}
                  onChange={handleSetCloseAt}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>

        {/* Thumbnail */}
        <FormControl>
          <FormLabel>Thumbnail</FormLabel>
          <Stack direction="row" alignItems="center" spacing={2}>
            {
              thumbnailUrl && (
                <Box position="relative">
                  <Paper
                    elevation={3}
                    sx={{ width: 128, height: 84, objectFit: 'cover' }}
                    component="img"
                    src={thumbnailUrl}
                  />
                  <IconButton
                    sx={{
                      position: 'absolute',
                      top: -15,
                      right: -15,
                      color: theme.palette.primary.main
                    }}
                    onClick={removeThumbnail}
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
              Select
              <input type="file" accept="image/*" hidden onChange={selectThumbnailFile} />
            </Button>
          </Stack>
        </FormControl>

        {/* Media */}
        <FormControl>
          <FormLabel>Media</FormLabel>
          <Stack direction="row" alignItems="center" spacing={2}>
            {mediaUrls.map((mediaUrl, index) => (
              <Box key={index} position="relative">
                <Paper
                  component="img"
                  src={mediaUrl}
                  elevation={3}
                  sx={{ width: 128, height: 84, objectFit: 'cover' }}
                />
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: -15,
                    right: -15,
                    color: theme.palette.primary.main
                  }}
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
              Select
              <input type="file" accept="image/*" hidden multiple onChange={selectUploadMediaFiles} />
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
              startIcon={<Icon icon="fluent:add-12-filled" />}
              onClick={openFaqAddForm}
            >
              Add a FAQ
            </Button>
          </Stack>
        </FormControl>

        {/* Buttons */}
        <Box>
          <Grid container spacing={6}>
            <Grid item xs={6}>
              <Button
                variant="outlined"
                fullWidth
                onClick={uploadFiles}
                disabled={!thumbnailFile && mediaFiles.length < 1}
              >
                Upload media
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                fullWidth
                onClick={() => formik.handleSubmit()}
                disabled={!!thumbnailFile || mediaFiles.length > 0}
              >
                Save campaign
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </Container>
  )
}