import { useState, useMemo } from "react"
import {
  Box,
  CSSObject,
  Divider,
  Drawer as MuiDrawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Theme,
  useTheme
} from "@mui/material"
import { Icon } from '@iconify/react'
import { Link as RouterLink, useLocation, useNavigate, useParams } from "react-router-dom"
import { COLOR_DARK, COLOR_WHITE, INDIVIDUAL } from "../../utils/constants"
import useAuth from "../../hooks/useAuth"

const ROUTES_OF_COMPANY = [
  {
    name: 'Profile',
    path: '/account-manage/profile',
    icon: 'carbon:user-avatar-filled'
  },
  {
    name: 'Settings',
    path: '/account-manage/setting',
    icon: 'ant-design:setting-filled'
  },
  {
    name: 'My Campaigns',
    path: '/account-manage/campaigns',
    icon: 'ic:baseline-campaign'
  },
  {
    name: 'My Posts',
    path: '/account-manage/posts',
    icon: 'mdi:post'
  },
  {
    name: 'My Comments',
    path: '/account-manage/comments',
    icon: 'bxs:comment-detail'
  }
]

const ROUTES_OF_INDIVIDUAL = [
  {
    name: 'Profile',
    path: '/account-manage/profile',
    icon: 'carbon:user-avatar-filled'
  },
  {
    name: 'Settings',
    path: '/account-manage/setting',
    icon: 'ant-design:setting-filled'
  },
  {
    name: 'My Posts',
    path: '/account-manage/posts',
    icon: 'mdi:post'
  },
  {
    name: 'My Comments',
    path: '/account-manage/comments',
    icon: 'bxs:comment-detail'
  }
]

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { pathname } = useLocation()
  const { userType } = useAuth()

  const pathParams = useParams()
  const [open, setOpen] = useState(true)

  //  Path without any parameters of path
  const path = useMemo(() => {
    let numberOfPathParams = Object.keys(pathParams).length
    let paths = pathname.split('/')
    paths.splice(paths.length - numberOfPathParams, numberOfPathParams)
    return paths.join('/')
  }, [pathname, pathParams])

  const routes = useMemo(() => {
    return userType === INDIVIDUAL ? ROUTES_OF_INDIVIDUAL : ROUTES_OF_COMPANY
  }, [userType])

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <Drawer
      variant="permanent"
      open={open}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: theme.palette.primary.main
        }
      }}
    >
      <Stack spacing={3}>
        {
          open ? (
            <Stack direction="row" alignItems="center" mt={3}>
              <Stack direction="row" justifyContent="center" width="80%">
                <Box
                  component="img"
                  src="/assets/images/logo.png"
                  alt="logo"
                  width="60%"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => { navigate('/') }}
                />
              </Stack>
              <IconButton onClick={handleDrawerClose}>
                <Icon icon="dashicons:arrow-left-alt2" />
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row" alignItems="center" mt={3}>
              <Stack direction="row" justifyContent="right" width="100%">
                <Box
                  component="img"
                  src="/assets/images/logo_abbrev.png"
                  alt="logo"
                  width="90%"
                  sx={{ cursor: 'pointer' }}
                  onClick={() => { navigate('/') }}
                />
              </Stack>
              <IconButton onClick={handleDrawerOpen}>
                <Icon icon="dashicons:arrow-right-alt2" />
              </IconButton>
            </Stack>
          )
        }

        <Divider />

        <List>
          {routes.map(route => (
            <ListItemButton
              key={route.path}
              component={RouterLink}
              to={route.path}
              sx={path === route.path ? {
                bgcolor: COLOR_DARK,
                color: COLOR_WHITE,
                '&:hover': {
                  bgcolor: COLOR_DARK,
                }
              } : {
                color: COLOR_WHITE
              }}
            >
              <ListItemIcon
                sx={
                  pathname === route.path ? {
                    fontSize: 24,
                    color: COLOR_WHITE
                  } : {
                    fontSize: 24,
                    color: COLOR_WHITE
                  }
                }
              >
                <Icon icon={route.icon} />
              </ListItemIcon>
              <ListItemText>{route.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Drawer >
  )
}