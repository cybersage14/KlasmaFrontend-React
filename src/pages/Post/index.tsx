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
import useAuth from "../../hooks/useAuth"
import usePost from "../../hooks/usePost"
import {
  convertTimeForClientTimezone,
  fetchFirstLettersFromName,
  getVisibleDateTime
} from "../../utils/functions"
import { TPostTab } from "../../utils/types"
import CommentsTab from "./tabs/CommentsTab"
import ContentTab from "./tabs/ContentTab"

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

interface IPropsOfPostcreator_avatar {
  dataItem: string;
}

const Postcreator_avatar = ({ dataItem }: IPropsOfPostcreator_avatar) => (
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
  const { currentUser } = useAuth()
  const { post, favoritesOfPost, creatorOfPost, getPostByIdAct, handleFavoriteOfPostAct } = usePost()

  const [currentTab, setCurrentTab] = useState<TPostTab>('content')

  useEffect(() => {
    getPostByIdAct(Number(id))
  }, [id])

  const createdAt = useMemo(() => {
    if (post?.created_at) {
      let convertedDateTime = convertTimeForClientTimezone(post?.created_at)
      return getVisibleDateTime(convertedDateTime)
    }
  }, [post?.created_at])

  const favoriteIconName = useMemo(() => {
    if (currentUser) {
      const index = favoritesOfPost.findIndex(favoriteItem => favoriteItem.id_user === currentUser.id_user)

      if (index > -1) {
        return "icon-park-solid:like"
      }
    }
    return "icon-park-outline:like"
  }, [favoritesOfPost, currentUser])

  const handleCurrentTab = (value: TPostTab) => {
    setCurrentTab(value)
  }

  const handleFavorite = () => {
    if (currentUser && post) {
      handleFavoriteOfPostAct(currentUser.id_user, post.id)
    }
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
                    carouselItemComponent={Postcreator_avatar}
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
                                creatorOfPost.avatar ? (
                                  <Avatar
                                    src={creatorOfPost.avatar}
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
                          <IconButton
                            color="primary"
                            disabled={!currentUser}
                            onClick={handleFavorite}
                          >
                            <MuiIcon>
                              <Icon icon={favoriteIconName} />
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