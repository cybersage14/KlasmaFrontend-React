import { Link as RouterLink, useLocation } from 'react-router-dom'
import { AppBar, Box, Button, Container, Stack } from "@mui/material"
import { ToolbarWithoutPaddingX } from "../components/styledComponents"
import { routes } from '../Routes/routes'
import { COLOR_WHITE } from '../utils/constants'

export default function Navbar() {
  const { pathname } = useLocation()
  return (
    <AppBar position="sticky" sx={{ bgcolor: COLOR_WHITE }}>
      <Container maxWidth="xl">
        <ToolbarWithoutPaddingX>
          <Button component={RouterLink} to="/">
            <Box component="img" src="/assets/images/logo.png" width={160} />
          </Button>
          <Box flexGrow={1} />
          <Stack direction="row" alignItems="center" spacing={2}>
            {
              routes.map(route => (
                <Button
                  key={route.path}
                  component={RouterLink}
                  to={route.path}
                  sx={{ fontWeight: 700 }}
                  variant={pathname === route.path ? 'outlined' : 'text'}
                >{route.name}</Button>
              ))
            }
          </Stack>
        </ToolbarWithoutPaddingX>
      </Container>
    </AppBar>
  )
}