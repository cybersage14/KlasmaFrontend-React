import { Icon } from "@iconify/react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  Icon as MuiIcon,
  useTheme,
  Tab,
  Card,
  CardContent,
  Button,
  Divider
} from "@mui/material";
import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router";
import { Link as RouterLink } from "react-router-dom";
import Countdown from "react-countdown";
import Carousel from "../../components/Carousel";
import InvestProgress from "../../components/InvestProgress";
import useCampaign from "../../hooks/useCampaign";
import { TCampaignTab } from "../../utils/types";
import { convertTimeForClientTimezone, getVisibleDateTime } from "../../utils/functions";
import CommentsTab from "./tabs/CommentsTab";
import DescriptionTab from "./tabs/DescriptionTab";
import FaqTab from "./tabs/FaqTab";
import Investors from "./Investors";
import useAuth from "../../hooks/useAuth";
import { ID_OF_STATUS_APPROVED, ID_OF_STATUS_CLOSED, ID_OF_STATUS_COMPLETED, INIT_REMAINED_M_SECONDS } from "../../utils/constants";
import TimeCountDown from "./TimeCountDown";

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

interface IPropsOfMedia {
  dataItem: string;
}

interface IPropsOfTimeCountDown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const MediaItem = ({ dataItem }: IPropsOfMedia) => (
  <Paper
    component="img"
    src={dataItem}
    alt="post"
    height={300}
  />
)

const timecountdown = ({ days, hours, minutes, seconds }: IPropsOfTimeCountDown) => {
  return <TimeCountDown days={days} hours={hours} minutes={minutes} seconds={seconds} />
}

export default function Campaign() {
  const theme = useTheme()
  const { currentUser } = useAuth()
  const { id } = useParams()
  const { campaign, investmentsOfCampaign, getCampaignByIdAct, closeCampaignAct } = useCampaign()

  const [currentTab, setCurrentTab] = useState<TCampaignTab>('description')

  useEffect(() => {
    console.log('>>>>>>> useEffect')
    getCampaignByIdAct(Number(id))
  }, [])

  const remainedMSecondsToBeClosed = useMemo(() => {
    if (campaign?.id_status === ID_OF_STATUS_APPROVED) {
      let closeAt = convertTimeForClientTimezone(campaign.close_at)
      let mSecondsOfCloseAt = closeAt.getTime()
      let mSecondsOfCurrent = Date.now()

      let result = mSecondsOfCloseAt - mSecondsOfCurrent

      if (result > 0) {
        console.log('>>>>> return result => ', result)
        return result
      }
    }
    console.log('>>>>> return 0')
    return 0
  }, [campaign])

  const campaignCreatedAt = useMemo(() => {
    if (campaign?.created_at) {
      let convertedDateTime = convertTimeForClientTimezone(campaign.created_at)
      return getVisibleDateTime(convertedDateTime)
    }
  }, [campaign?.created_at])

  const handleCurrentTab = (value: TCampaignTab) => {
    setCurrentTab(value)
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, pb: 6 }}>
      {
        campaign && (
          <Box>
            <Grid container spacing={8}>
              <Grid item xs={12} sm={8}>
                {/* Media */}
                <Carousel
                  data={campaign.medias}
                  slideSettings={SLIDE_SETTINGS}
                  carouselItemComponent={MediaItem}
                  arrowsVisible={false}
                />

                {/* Title */}
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{ mt: 4 }}
                >
                  {campaign.title}
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1} mt={1}>
                  <MuiIcon sx={{ color: theme.palette.primary.main, height: 'auto', fontSize: 18 }}>
                    <Icon icon="bi:clock-fill" />
                  </MuiIcon>
                  <Typography component="span" variant="body1">
                    {campaignCreatedAt}
                  </Typography>
                </Stack>

                {/* Tabs */}
                <Box mt={5}>
                  <TabContext value={currentTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={(e, value) => handleCurrentTab(value)}>
                        <Tab label="Description" value="description" />
                        <Tab label="FAQ" value="faq" />
                        <Tab label="Comments" value="comments" />
                      </TabList>
                    </Box>
                    <TabPanel value="description">
                      <DescriptionTab description={campaign.description} />
                    </TabPanel>
                    <TabPanel value="faq">
                      <FaqTab faqs={campaign.faqs} />
                    </TabPanel>
                    <TabPanel value="comments">
                      <CommentsTab />
                    </TabPanel>
                  </TabContext>
                </Box>

                <Divider />

                {/* <RelatedCampaigns sx={{ my: 2 }} /> */}
              </Grid>

              <Grid item xs={12} sm={4}>
                <Stack spacing={2}>
                  <Card>
                    <CardContent>
                      <Countdown
                        date={Date.now() + remainedMSecondsToBeClosed}
                        renderer={timecountdown}
                        onComplete={() => {
                          if (
                            campaign.id_status !== ID_OF_STATUS_CLOSED &&
                            campaign.id_status !== ID_OF_STATUS_COMPLETED
                          ) {
                            closeCampaignAct(Number(id))
                          }
                        }}
                      />
                      <InvestProgress
                        sx={{ mt: 4 }}
                        raised={campaign.raised_price}
                        goal={campaign.goal_price}
                      />
                      <Button
                        sx={{ mt: 3, textTransform: 'uppercase' }}
                        variant="contained"
                        fullWidth
                        component={RouterLink}
                        to={`/checkout/${campaign.id}`}
                        disabled={!currentUser || campaign.id_status !== ID_OF_STATUS_APPROVED}
                      >
                        Invest
                      </Button>
                    </CardContent>
                  </Card>

                  <Investors investments={investmentsOfCampaign} />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        )
      }
    </Container>
  )
}