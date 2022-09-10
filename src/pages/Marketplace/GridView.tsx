import { Box, Grid } from "@mui/material";
import CampaignCard from "../../components/CampaignCard";
import useCampaign from "../../hooks/useCampaign";
import { ISxProps } from "../../utils/interfaces";

export default function GridView({ sx }: ISxProps) {
  const { campaigns } = useCampaign()

  return (
    <Box sx={{ ...sx }}>
      <Grid container spacing={1}>
        {
          campaigns.map((dataItem, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <CampaignCard
                dataItem={dataItem}
              />
            </Grid>
          ))
        }
      </Grid>
    </Box>
  )
}