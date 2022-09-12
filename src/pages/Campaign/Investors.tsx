import { Box, Card, CardContent, CardHeader, Stack, Typography } from "@mui/material";
import NoData from "../../components/NoData";
import { getVisibleDateTime } from "../../utils/functions";
import { IInvestment } from "../../utils/interfaces";

interface IProps {
  investments: Array<IInvestment>;
}

export default function Investors({ investments }: IProps) {
  return (
    <Card>
      <CardHeader
        title="Investors"
        titleTypographyProps={{
          variant: 'h5',
          fontWeight: 700
        }}
      />
      <CardContent>
        {
          investments.length > 0 ? (
            <Stack spacing={2}>
              {
                investments.map(dataItem => (
                  <Box key={dataItem.id}>
                    <Typography variant="body1" fontWeight={700}>{dataItem.email}</Typography>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="body2" component="span">
                        {dataItem.price}
                      </Typography>
                      <Typography variant="body2" component="span">
                        {getVisibleDateTime(dataItem.created_at)}
                      </Typography>
                    </Stack>
                  </Box>
                ))
              }
            </Stack>
          ) : (
            <NoData text="No investor" />
          )
        }
      </CardContent>
    </Card>
  )
}