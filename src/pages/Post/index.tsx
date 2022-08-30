import { Icon } from "@iconify/react"
import { Box, Card, Container, Grid, Link, Paper, Stack, Typography } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom'
import Carousel from "../../components/Carousel"

const TAGS = ['apple', 'bike', 'cat', 'dog', 'elephant', 'fly', 'goat']
const IMAGES = [
  '/assets/images/invest-card-sample-thumbnail.png',
  '/assets/images/invest-card-sample-thumbnail.png',
  '/assets/images/invest-card-sample-thumbnail.png',
  '/assets/images/invest-card-sample-thumbnail.png'
]

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
  return (
    <Container sx={{ py: 3 }}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {/* Title */}
            <Typography
              variant="h4"
              fontWeight={700}
              mb={2}
            >
              On it differed repeated wandered required in
            </Typography>
            
            {/* Media */}
            <Carousel
              data={IMAGES}
              slideSettings={SLIDE_SETTINGS}
              carouselItemComponent={PostImage}
              arrowsVisible={false}
            />

          </Grid>

          <Grid item xs={12} md={4}>
            {/* Meta information */}
            <Card sx={{ py: 3, px: 2 }}>
              <Stack spacing={2}>
                {/* Posted by */}
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Icon icon="bxs:user" />&nbsp;
                    Posted by
                  </Typography>
                  <Typography variant="body1" fontWeight={700}>
                    <Link component={RouterLink} to="/users/1">
                      John Doe
                    </Link>
                  </Typography>
                </Box>

                {/* Posted at */}
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Icon icon="clarity:date-solid" />&nbsp;
                    Posted at
                  </Typography>
                  <Typography variant="body1">
                    May 9, 2022
                  </Typography>
                </Box>

                {/* Tags */}
                <Box>
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    <Icon icon="bi:tag-fill" />&nbsp;
                    Tags
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    {
                      TAGS.map(tag => (
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

      
    </Container>
  )
}