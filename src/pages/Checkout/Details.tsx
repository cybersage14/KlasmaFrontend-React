import { Icon } from "@iconify/react";
import { Box, Card, CardContent, CardHeader, Stack, TextField, Typography, Icon as MuiIcon, Divider } from "@mui/material";
import { PRE_THUMBNAIL } from "../../utils/constants";
import { ICampaign } from "../../utils/interfaces";

interface IProps {
  campaign: ICampaign | null;
  price: number;
  fee: number;
  handleSetFee: Function
}

export default function Details({ campaign, price, fee, handleSetFee }: IProps) {
  return (
    <Card>
      <CardHeader
        title="Your investment details"
        titleTypographyProps={{
          variant: 'h5',
          fontWeight: 700
        }}
      />
      <CardContent>
        {/* Cmpaign info */}
        <Stack direction="row" spacing={2}>
          <Box
            component="img"
            src={campaign?.thumbnail || PRE_THUMBNAIL}
            alt=""
            width={100}
            height={70}
            sx={{ objectFit: 'cover' }}
          />
          <Box>
            <Typography variant="body1" fontWeight={700}>
              {campaign?.title}
            </Typography>
            <Typography variant="body2">
              Created by {campaign?.company_name}
            </Typography>
          </Box>
        </Stack>

        <Stack spacing={2}>
          {/* Price and Fee */}
          <Box mt={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1">Your investment</Typography>
              <Typography variant="body1" fontWeight={700}>${price}</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="body1" sx={{ flexGrow: 1 }}>Klasma fee</Typography>
              <TextField
                value={fee}
                onChange={e => handleSetFee(e.target.value)}
                sx={{ mt: 2, width: 100 }}
                InputProps={{
                  startAdornment: <MuiIcon><Icon icon="bx:dollar" /></MuiIcon>
                }}
              />
            </Stack>
          </Box>

          <Divider />

          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="body1" fontWeight={900}>Total</Typography>
            <Typography variant="body1" fontWeight={900}>${price + fee}</Typography>
          </Stack>
        </Stack>

      </CardContent>
    </Card>
  )
}