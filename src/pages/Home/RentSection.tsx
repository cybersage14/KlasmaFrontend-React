import { Icon } from "@iconify/react";
import { Avatar, Box, Container, Stack, useTheme, Icon as MuiIcon, Typography, Grid } from "@mui/material";
import { Fragment } from "react";
import MHidden from "../../components/MHidden";
import SectionTitle from "../../components/SectionTitle";
import { IRentData, ISxProps } from "../../utils/interfaces";

const DATA: Array<IRentData> = [
  {
    icon: 'fluent:person-tag-20-filled',
    name: 'Tenant'
  },
  {
    icon: 'healthicons:money-bag',
    name: 'Pays AU$'
  },
  {
    icon: 'ic:sharp-manage-history',
    name: 'Management'
  },
  {
    icon: 'ri:coins-fill',
    name: 'Sends Stablecoin'
  },
  {
    icon: 'mdi:hand-coin',
    name: 'Klasma Token'
  },
  {
    icon: 'fa:bank',
    name: 'To Bank Account'
  }
]

export default function RentSection({ sx }: ISxProps) {
  const theme = useTheme()
  return (
    <Container maxWidth="lg" sx={{ ...sx }}>
      <SectionTitle
        title="Rent Payments are automatically sent to investors"
      />

      <MHidden breakpoint="sm" direction="down">
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          {
            DATA.map((dataItem, index) => (
              <Fragment key={index}>
                <Box position="relative">
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, p: { sm: 3, md: 6 } }}>
                    <MuiIcon sx={{ fontSize: { sm: 48, md: 64 }, width: 'auto' }}>
                      <Icon icon={dataItem.icon} />
                    </MuiIcon>
                  </Avatar>
                  <Box position="absolute" width="100%" mt={3}>
                    <Typography 
                      variant="h5" 
                      fontWeight={700} 
                      textAlign="center" 
                      color={theme.palette.primary.main}
                    >
                      {dataItem.name}
                    </Typography>
                  </Box>
                </Box>

                {index < DATA.length - 1 && (
                  <MuiIcon sx={{ color: theme.palette.primary.main }}>
                    <Icon icon="ep:d-arrow-right" />
                  </MuiIcon>
                )}
              </Fragment>
            ))
          }
        </Stack>
      </MHidden>

      <MHidden breakpoint="sm" direction="up">
        <Stack spacing={2}>
          {
            DATA.map((dataItem, index) => (
              <Fragment key={index}>
                <Box>
                  <Grid container spacing={6} alignItems="center">
                    <Grid item xs={6}>
                      <Typography
                        variant="h5"
                        fontWeight={700}
                        textAlign="center"
                        color={theme.palette.primary.main}
                      >
                        {dataItem.name}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Stack direction="row" justifyContent="center">
                        <Avatar sx={{ bgcolor: theme.palette.primary.main, p: 6 }}>
                          <MuiIcon sx={{ fontSize: 64, width: 'auto' }}>
                            <Icon icon={dataItem.icon} />
                          </MuiIcon>
                        </Avatar>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>

                {
                  index < DATA.length - 1 && (
                    <Box>
                      <Grid container spacing={6}>
                        <Grid item xs={6}></Grid>
                        <Grid item xs={6}>
                          <Stack direction="row" justifyContent="center">
                            <MuiIcon sx={{ color: theme.palette.primary.main, width: 'auto', height: 'auto' }}>
                              <Icon icon="fa:arrow-down" />
                            </MuiIcon>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Box>
                  )
                }
              </Fragment>
            ))
          }

        </Stack>
      </MHidden>
    </Container>
  )
}