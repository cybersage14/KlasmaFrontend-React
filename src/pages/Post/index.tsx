import { Icon } from "@iconify/react"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import {
  Box,
  Card,
  Container,
  Grid,
  IconButton,
  Link,
  Paper,
  Stack,
  Tab,
  Typography,
  Icon as MuiIcon,
  Button,
  Avatar,
  useTheme,
  Divider
} from "@mui/material"
import { useState, useEffect, useMemo } from "react"
import { Link as RouterLink, useParams } from 'react-router-dom'
import Carousel from "../../components/Carousel"
import usePost from "../../hooks/usePost"
import { convertTimeForClientTimezone, fetchFirstLettersFromName, getVisibleDateTime } from "../../utils/functions"
import { TPostTab } from "../../utils/types"
import CommentsTab from "./tabs/CommentsTab"
import ContentTab from "./tabs/ContentTab"

const TAGS = ['apple', 'bike', 'cat', 'dog', 'elephant', 'fly', 'goat']

const SLIDE_SETTINGS = {
  dots: true,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 9000,
}

interface IPropsOfPostImage {
  dataItem: string;
}

const PostImage = ({ dataItem }: IPropsOfPostImage) => (
  <Paper
    component="img"
    src={dataItem}
    alt="post"
    width="100%"
    height="100%"
  />
)

export default function Post() {
  const theme = useTheme()
  const { id } = useParams()
  const { post, favoritesOfPost, creatorOfPost, getPostByIdAct } = usePost()

  const [currentTab, setCurrentTab] = useState<TPostTab>('content')

  useEffect(() => {
    getPostByIdAct(Number(id))
  }, [])

  const createdAt = useMemo(() => {
    if (post?.created_at) {
      let convertedDateTime = convertTimeForClientTimezone(post?.created_at)
      return getVisibleDateTime(convertedDateTime)
    }
  }, [post?.created_at])

  const handleCurrentTab = (value: TPostTab) => {
    setCurrentTab(value)
  }

  return (
    <Container sx={{ py: 3 }}>
      {
        post && (
          <>
            {/* Title */}
            <Typography
              variant="h4"
              fontWeight={700}
              mb={2}
            >
              {post.title}
            </Typography>

            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  {/* Media */}
                  <Carousel
                    data={post.medias}
                    slideSettings={SLIDE_SETTINGS}
                    carouselItemComponent={PostImage}
                    arrowsVisible={false}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  {/* Meta information */}
                  <Card sx={{ py: 3, px: 2 }}>
                    <Stack spacing={2}>
                      {/* Posted at */}
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight={700}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Icon icon="clarity:date-solid" />&nbsp;
                          Posted at
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {createdAt}
                        </Typography>
                      </Box>

                      <Divider />

                      {/* Posted by */}
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight={700}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Icon icon="bxs:user" />&nbsp;
                          Posted by
                        </Typography>
                        {
                          creatorOfPost && (
                            <Button
                              startIcon={
                                creatorOfPost.image ? (
                                  <Avatar
                                    component="img"
                                    src={creatorOfPost.image}
                                    alt=""
                                  />
                                ) : (
                                  <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                                    {fetchFirstLettersFromName(creatorOfPost.name)}
                                  </Avatar>
                                )
                              }
                              component={RouterLink}
                              to={`/users/${post.created_by}`}
                            >{creatorOfPost.name}</Button>
                          )
                        }
                      </Box>

                      <Divider />

                      {/* Favorites */}
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight={700}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Icon icon="bxs:star" />&nbsp;
                          Favorites
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <IconButton color="primary">
                            <MuiIcon>
                              <Icon icon="icon-park-outline:like" />
                            </MuiIcon>
                          </IconButton>
                          <Typography component="span" variant="body1">
                            {favoritesOfPost.length}
                          </Typography>
                        </Stack>
                      </Box>

                      <Divider />

                      {/* Tags */}
                      <Box>
                        <Typography
                          variant="body1"
                          fontWeight={700}
                          sx={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Icon icon="bi:tag-fill" />&nbsp;
                          Tags
                        </Typography>
                        <Stack direction="row" spacing={1}>
                          {
                            post.tags.map(tag => (
                              <Link key={tag} component={RouterLink} to={`/posts/search/${tag}`}>
                                {tag}
                              </Link>
                            ))
                          }
                        </Stack>
                      </Box>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </Box>

            {/* Tabs */}
            <Box mt={5}>
              <TabContext value={currentTab}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={(e, value) => handleCurrentTab(value)}>
                    <Tab label="Content" value="content" />
                    <Tab label="Comments" value="comments" />
                  </TabList>
                </Box>
                <TabPanel value="content"><ContentTab content={post.description} /></TabPanel>
                <TabPanel value="comments"><CommentsTab /></TabPanel>
              </TabContext>
            </Box>
          </>
        )
      }
    </Container>
  )
}