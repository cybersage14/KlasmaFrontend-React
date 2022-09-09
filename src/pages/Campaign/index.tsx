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
import { useState } from "react";
import InvestProgress from "../../components/InvestProgress";
import { TCampaignTab } from "../../utils/types";
import RelatedCampaigns from "./RelatedCampaigns";
import CommentsTab from "./tabs/CommentsTab";
import DescriptionTab from "./tabs/DescriptionTab";
import FaqTab from "./tabs/FaqTab";
import TimeCountDown from "./TimeCountDown";

export default function Campaign() {
  const theme = useTheme()

  const [currentTab, setCurrentTab] = useState<TCampaignTab>('description')

  const handleCurrentTab = (value: TCampaignTab) => {
    setCurrentTab(value)
  }
  return (
    <Container maxWidth="lg" sx={{ mt: 6, pb: 6 }}>
      <Box>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={8}>
            {/* Image */}
            <Paper
              component="img"
              src="/assets/images/invest-card-sample-thumbnail.png"
              alt="image"
              width="100%"
              elevation={12}
            />

            {/* Title */}
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{ mt: 4 }}
            >
              On it differed repeated wandered required in
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1} mt={1}>
              <MuiIcon sx={{ color: theme.palette.primary.main, height: 'auto', fontSize: 18 }}>
                <Icon icon="bi:clock-fill" />
              </MuiIcon>
              <Typography component="span" variant="body1">
                06/12/2018
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
                <TabPanel value="description"><DescriptionTab /></TabPanel>
                <TabPanel value="faq"><FaqTab /></TabPanel>
                <TabPanel value="comments"><CommentsTab /></TabPanel>
              </TabContext>
            </Box>

            <Divider />

            <RelatedCampaigns sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card>
              <CardContent>
                <TimeCountDown />
                <InvestProgress sx={{ mt: 4 }} raised={240} goal={1000} />
                <Button sx={{ mt: 3, textTransform: 'uppercase' }} variant="contained" fullWidth>
                  Invest
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}