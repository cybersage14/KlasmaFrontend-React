import { Link as RouterLink, useLocation } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Menu,
  MenuItem,
  Stack,
  useTheme
} from "@mui/material"
import { useState, useMemo, useEffect } from 'react'
import { Icon } from '@iconify/react'
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import { ethers } from 'ethers';
import { ToolbarWithoutPaddingX } from "../../components/styledComponents"
import {
  CHAIN_ID_HEX,
  CHAIN_LABEL,
  COLOR_BLACK,
  COLOR_PRIMARY,
  COLOR_WHITE,
  COIN_SYMBOL,
  URL_OF_BRIDGE,
  URL_OF_RPC,
  VALUE_OF_UNVERIFIED
} from '../../utils/constants'
import useAuth from '../../hooks/useAuth'
import { fetchFirstLettersFromName } from '../../utils/functions'
import useWallet from '../../hooks/useWallet';

const ROUTES = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Marketplace',
    path: '/marketplace'
  },
  // {
  //   name: 'Sell Token',
  //   path: '/sell-token'
  // },
  {
    name: 'Team',
    path: '/team'
  },
  {
    name: 'Learn',
    path: '/learn'
  },
  {
    name: 'Blog',
    path: '/blog'
  }
]

const injected = injectedModule();
const walletConnect = walletConnectModule({
  bridge: URL_OF_BRIDGE,
  qrcodeModalOptions: {
    mobileLinks: []
  }
});
const onboard = Onboard({
  wallets: [injected, walletConnect],
  chains: [
    {
      id: CHAIN_ID_HEX,
      token: COIN_SYMBOL,
      label: CHAIN_LABEL,
      rpcUrl: `${URL_OF_RPC}/${process.env.REACT_APP_INFURA_ID}`
    }
  ],
  accountCenter: {
    desktop: {
      position: 'bottomLeft',
      enabled: true,
      minimal: true
    },
    mobile: {
      position: 'bottomLeft',
      enabled: true,
      minimal: true
    }
  }
});

export default function Navbar() {
  const { pathname } = useLocation()
  const theme = useTheme()
  const { currentUser, signoutAct, updateWalletAddressAct } = useAuth()
  const { provider, setProviderAndSignerAct } = useWallet()

  const [drawerOpened, setDrawerOpened] = useState(false)
  const [accountAnchorEl, setAccountAnchorEl] = useState<null | HTMLElement>(null)
  const [accountMenuOpened, setAccountMenuOpened] = useState(false)

  const username = useMemo(() => {
    if (currentUser?.id_company) {
      return `${currentUser.company_name}`
    } else {
      return `${currentUser?.first_name} ${currentUser?.last_name}`
    }
  }, [currentUser])

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

  const connectWallet = async () => {
    if (currentUser) {
      await onboard.connectWallet()
      const wallet = onboard.state.get().wallets[0]
      const walletAddress = wallet.accounts[0].address
      const provider = new ethers.providers.Web3Provider(wallet.provider, 'any')

      if (currentUser.wallet_address !== walletAddress) {
        await updateWalletAddressAct({
          wallet_address: walletAddress,
          id_user_type: currentUser.id_user_type,
        }, currentUser.id_user)
      }

      await setProviderAndSignerAct(provider)
    }
  }

  const disconnectWallet = async () => {
    const walletStates = onboard.state.get().wallets
    await onboard.disconnectWallet({ label: walletStates[0].label })
    await setProviderAndSignerAct(null)
  }

  useEffect(() => {
    console.log('>>>>>>> !currentUser && !provider')
    if (!currentUser && provider) {
      disconnectWallet()
    }
  }, [currentUser, provider])

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
                  ROUTES.map(route => (
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
                  ))
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
            ROUTES.map(route => (
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
            ))
          }

          {
            currentUser ? (
              <>
                {
                  provider ? (
                    <Button variant="contained" onClick={disconnectWallet}>
                      Disconnect
                    </Button>
                  ) : (
                    <Button variant="contained" onClick={connectWallet}>
                      Connect wallet
                    </Button>
                  )
                }

                <Box>
                  <IconButton
                    id="account-button"
                    onClick={openAccountMenu}
                  >
                    {
                      currentUser.avatar ? (
                        <Avatar
                          src={currentUser.avatar}
                          alt=""
                        />
                      ) : (
                        <Avatar sx={{ bgcolor: COLOR_PRIMARY }}>
                          {fetchFirstLettersFromName(username)}
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
                    {
                      currentUser.email_verified === VALUE_OF_UNVERIFIED ? (
                        <MenuItem
                          component={RouterLink}
                          to="/resend-email-verification"
                        >Email verify</MenuItem>
                      ) : (
                        <>
                          <MenuItem
                            component={RouterLink}
                            to="/account-manage/profile"
                          >Profile</MenuItem>
                          <MenuItem
                            component={RouterLink}
                            to="/account-manage/setting"
                          >Setting</MenuItem>
                        </>
                      )
                    }
                    <MenuItem onClick={signout}>Logout</MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <Button
                component={RouterLink}
                to="/login"
                sx={pathname === "/login" ? {
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  mr: 2
                } : {
                  fontWeight: 600,
                  color: COLOR_BLACK,
                  mr: 2
                }}
              >Login</Button>
            )
          }
        </ToolbarWithoutPaddingX>
      </Container>
    </AppBar>
  )
}