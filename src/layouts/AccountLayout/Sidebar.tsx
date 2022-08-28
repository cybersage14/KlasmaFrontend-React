import { Fragment, useState } from "react";
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
  Theme
} from "@mui/material"
import { Icon } from '@iconify/react'
import { Link as RouterLink } from "react-router-dom"

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

const ROUTES_OF_USER = [
  {
    name: 'Profile',
    path: '/account-user/profile',
    icon: 'carbon:user-avatar-filled'
  },
  {
    name: 'Settings',
    path: '/account-user/setting',
    icon: 'ant-design:setting-filled'
  },
  {
    name: 'My Campaigns',
    path: '/account-user/campaigns',
    icon: 'ic:baseline-campaign'
  },
  {
    name: 'My Posts',
    path: '/account-user/posts',
    icon: 'mdi:post'
  },
  {
    name: 'My Comments',
    path: '/account-user/comments',
    icon: 'bxs:comment-detail'
  }
]

const ROUTES_OF_COMPANY = [
  {
    name: 'Profile',
    path: '/account-company/profile',
    icon: 'carbon:user-avatar-filled'
  },
  {
    name: 'Settings',
    path: '/account-company/setting',
    icon: 'ant-design:setting-filled'
  },
  {
    name: 'My Campaigns',
    path: '/account-company/campaigns',
    icon: 'ic:baseline-campaign'
  },
  {
    name: 'My Posts',
    path: '/account-company/posts',
    icon: 'mdi:post'
  },
  {
    name: 'My Comments',
    path: '/account-user/comments',
    icon: 'bxs:comment-detail'
  }
]

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false)
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Stack spacing={3}>
        <Stack direction="row" alignItems="center" mt={3}>
          <Stack direction="row" justifyContent="center" width="80%">
            <Box component="img" src="/assets/images/logo.png" alt="logo" width="60%" />
          </Stack>
          {
            open ? (
              <IconButton onClick={handleDrawerClose}>
                <Icon icon="dashicons:arrow-left-alt2" />
              </IconButton>
            ) : (
              <IconButton onClick={handleDrawerOpen}>
                <Icon icon="dashicons:arrow-right-alt2" />
              </IconButton>
            )
          }
        </Stack>

        <Divider />

        <List>
          {ROUTES_OF_USER.map(route => (
            <ListItemButton key={route.path} component={RouterLink} to={route.path}>
              <ListItemIcon sx={{ fontSize: 24 }}>
                <Icon icon={route.icon} />
              </ListItemIcon>
              <ListItemText>{route.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </Drawer>
  )
}