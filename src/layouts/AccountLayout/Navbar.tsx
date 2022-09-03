import { Link as RouterLink, useLocation, useParams } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useTheme,
} from "@mui/material"
import { useState, useMemo } from 'react'
import { Icon } from '@iconify/react'
import { ToolbarWithoutPaddingX } from "../../components/styledComponents"
import { COLOR_DARK, COLOR_PRIMARY } from '../../utils/constants'
import useAuth from '../../hooks/useAuth'
import { fetchFirstLettersFromName } from '../../utils/functions'

export default function Navbar() {
  const { currentUser, signoutAct } = useAuth()
  const theme = useTheme()
  const { pathname } = useLocation()
  const pathParams = useParams()

  const [drawerOpened, setDrawerOpened] = useState(false)
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null)
  const [accountMenuOpened, setAccountMenuOpened] = useState(false)

  const pageTitle = useMemo(() => {
    let numberOfPathParams = Object.keys(pathParams).length
    let paths = pathname.split('/')
    paths.splice(paths.length - numberOfPathParams, numberOfPathParams)
    return paths[paths.length - 1]
  }, [pathname, pathParams])

  const openAccountMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAccountAnchorEl(event.currentTarget)
    setAccountMenuOpened(true)
  }

  const closeAccountMenu = () => {
    setAccountAnchorEl(null)
    setAccountMenuOpened(false)
  }

  const signout = () => {
    signoutAct()
  }

  return (
    <AppBar position="sticky" sx={{ bgcolor: COLOR_DARK }}>
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
            </Box>
          </Drawer>

          <Typography
            component="span"
            variant="h5"
            fontWeight={700}
            color={theme.palette.primary.main}
            textTransform="capitalize"
          >
            {pageTitle}
          </Typography>

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

          <Box>
            <IconButton
              id="account-button"
              onClick={openAccountMenu}
            >
              {
                currentUser?.avatar ? (
                  <Avatar
                    component="img"
                    src={currentUser?.avatar}
                    alt=""
                  />
                ) : (
                  <Avatar sx={{ bgcolor: COLOR_PRIMARY }}>
                    {fetchFirstLettersFromName(`${currentUser?.first_name} ${currentUser?.last_name}`)}
                  </Avatar>
                )
              }
            </IconButton>

            <Menu
              id="account-menu"
              anchorEl={accountAnchorEl}
              open={accountMenuOpened}
              onClose={closeAccountMenu}
            >
              <MenuItem
                component={RouterLink}
                to="/account-manage/profile"
              >Profile</MenuItem>
              <MenuItem
                component={RouterLink}
                to="/account-manage/setting"
              >Setting</MenuItem>
              <MenuItem onClick={signout}>Logout</MenuItem>
            </Menu>
          </Box>
        </ToolbarWithoutPaddingX>
      </Container>
    </AppBar>
  )
}