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
import { IPostReq } from '../../utils/interfaces';
import { storage } from '../../utils/firebase';
import useLoading from '../../hooks/useLoading';
import { generateUniqueFileName, getIndexesOfBlobs } from '../../utils/functions';
import useAlertMessage from '../../hooks/useAlertMessage';
import { ERROR, MESSAGE_FILE_UPLOAD_FAILED } from '../../utils/constants';
import useAuth from '../../hooks/useAuth';
import usePost from '../../hooks/usePost';

const validSchema = yup.object().shape({
  title: yup.string().required('Title is required.'),
});

export default function UserEditPost() {
  const { mode, id } = useParams()
  const theme = useTheme()
  const { openLoading, closeLoading } = useLoading()
  const { openAlert } = useAlertMessage()
  const { post, savePostAct } = usePost()
  const { currentUser } = useAuth()

  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('')
  const [mediaFiles, setMediaFiles] = useState<Array<File>>([])
  const [mediaUrls, setMediaUrls] = useState<Array<string>>([])

  // useEffect(() => {
  //   if (id) {
  //     getCampaignByIdAct(Number(id))
  //   }
  // }, [id])

  // useEffect(() => {
  //   if (id && campaign) {
  //     let blocks = convertFromHTML(campaign.description)
  //     setEditorState(EditorState.createWithContent(
  //       ContentState.createFromBlockArray(blocks.contentBlocks)
  //     ))

  //     setThumbnailUrl(campaign.thumbnail)
  //     setMediaUrls(campaign.medias)
  //   }
  // }, [id, campaign])

  //  title, 
  const initialValues = useMemo(() => {
    if (id && post) {
      return {
        title: post.title,
      }
    }
    return {
      title: '',
    }
  }, [id, post])

  //  Page title by mode
  const pageTitle = useMemo(() => {
    if (mode === 'new') {
      return 'New post'
    }
    return 'Edit post'
  }, [mode])

  const formik = useFormik({
    initialValues,
    validationSchema: validSchema,
    onSubmit: (values) => {
      const { title } = values
      let description = draftToHtml(convertToRaw(editorState.getCurrentContent()))

      const reqData: IPostReq = {
        created_by: currentUser?.id_user,
        title,
      }

      if (description) {
        reqData.description = description
      }
      if (thumbnailUrl) {
        reqData.thumbnail = thumbnailUrl
      }
      reqData.medias = mediaUrls

      if (id) {
        savePostAct(reqData, Number(id))
      } else {
        savePostAct(reqData)
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
        storageRef = ref(storage, `/post_thumbnails/${fileName}`)
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
        storageRef = ref(storage, `/post_medias/${fileName}`)
        let uploadProcess = uploadBytesResumable(storageRef, mediaFiles[i])

        uploadProcess.on(
          'state_changed',
          (snapshot) => {
            let percent = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
            console.log('>>>>>>> percentage of media => ', percent)
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