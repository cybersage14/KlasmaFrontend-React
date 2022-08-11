import { Link as RouterLink, useLocation } from 'react-router-dom'
import { AppBar, Box, Button, Container, Drawer, IconButton, List, ListItem, ListItemButton, Stack, useTheme } from "@mui/material"
import { ToolbarWithoutPaddingX } from "../components/styledComponents"
import { routes } from '../Routes/routes'
import { COLOR_BLACK, COLOR_WHITE } from '../utils/constants'
import { Fragment, useState } from 'react'
import { Icon } from '@iconify/react'

export default function Navbar() {
  const { pathname } = useLocation()
  const theme = useTheme()

  const [drawerOpened, setDrawerOpened] = useState(false);

  return (
    <AppBar position="sticky" sx={{ bgcolor: COLOR_WHITE }}>
      <Container maxWidth="xl">
        <ToolbarWithoutPaddingX>
          {/* For Mobile */}
          <Drawer
            anchor="right"
            open={drawerOpened}
            onClose={() => setDrawerOpened(false)}
          >
            <Box my={3}>
              <Stack direction="row" justifyContent="center" alignItems="center">
                <Button component={RouterLink} to="/">
                  <Box component="img" src="/assets/images/logo.png" width={100} />
                </Button>
              </Stack>
              <List sx={{ mt: 2 }} onClick={() => setDrawerOpened(false)}>
                {
                  routes.map(route => {
                    if (route.name) {
                      return (
                        <ListItem key={route.path}>
                          <ListItemButton
                            component={RouterLink}
                            to={route.path}
                            sx={route.path === pathname ? {
                              fontWeight: 700,
                              color: theme.palette.primary.main
                            } : {
                              fontWeight: 700,
                            }}
                          >
                            {route.name}
                          </ListItemButton>
                        </ListItem>
                      )
                    } else {
                      return <Fragment key={route.path} />
                    }
                  })
                }
              </List>
            </Box>
          </Drawer>

          {/* Logo */}
          <Button component={RouterLink} to="/">
            <Box component="img" src="/assets/images/logo.png" width={160} />
          </Button>

          <Box flexGrow={1}>
            <Stack direction="row" justifyContent="end">
              {/* For Mobile */}
              <IconButton
                size="large"
                sx={{ ml: { xs: 2, md: 0 }, display: { xs: 'flex', md: 'none' } }}
                onClick={() => setDrawerOpened(true)}
              >
                <Icon icon="bx:menu" />
              </IconButton>
            </Stack>
          </Box>

          {
            routes.map(route => {
              if (route.name) {
                if (route.name !== 'Login') {
                  return (
                    <Button
                      key={route.path}
                      component={RouterLink}
                      to={route.path}
                      sx={route.path === pathname ? {
                        fontWeight: 700,
                        display: { xs: 'none', md: 'flex' },
                        color: theme.palette.primary.main,
                        mr: 2
                      } : {
                        fontWeight: 600,
                        display: { xs: 'none', md: 'flex' },
                        color: COLOR_BLACK,
                        mr: 2
                      }}
                    >{route.name}</Button>
                  )
                } else {
                  return (
                    <Button
                      key={route.path}
                      component={RouterLink}
                      to={route.path}
                      sx={route.path === pathname ? {
                        fontWeight: 700,
                        color: theme.palette.primary.main,
                        mr: 2
                      } : {
                        fontWeight: 600,
                        color: COLOR_BLACK,
                        mr: 2
                      }}
                    >{route.name}</Button>
                  )
                }
              }
              return (
                <Fragment key={route.path} />
              )
            })
          }
        </ToolbarWithoutPaddingX>
      </Container>
    </AppBar>
  )
}