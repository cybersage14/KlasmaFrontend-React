import { Icon } from "@iconify/react";
import { Button, Container, Stack } from "@mui/material";
import { useEffect } from "react";
import { Link as RouterLink } from 'react-router-dom';
import NoData from "../../components/NoData";
import useAuth from "../../hooks/useAuth";
import useCampaign from "../../hooks/useCampaign";
import CampaignCard from "./CampaignCard";

export default function UserCampaigns() {
  const { currentUser } = useAuth()
  const { campaigns, getCampaignsByCompanyIdAct } = useCampaign()
  useEffect(() => {
    if (currentUser?.id_company) {
      getCampaignsByCompanyIdAct(currentUser.id_company)
    }
  }, [])
  return (
    <Container maxWidth="md" sx={{ py: 3 }}>
      <Stack direction="row" justifyContent="end">
        <Button
          variant="contained"
          startIcon={<Icon icon="fluent:add-12-filled" />}
          component={RouterLink}
          to="/account-manage/campaigns/new"
        >
          New campaign
        </Button>
      </Stack>
      {
        campaigns.length > 0 ? (
          <Stack spacing={2} mt={2}>
            {
              campaigns.map(campaign => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))
            }
          </Stack>
        ) : (
          <NoData text="No campaign" />
        )
      }
    </Container>
  )
}