import { Link as RouterLink } from 'react-router-dom'
import { AppBar, Box, Button, Container } from "@mui/material"
import { ToolbarWithoutPaddingX } from "../components/styledComponents"
import { routes } from '../Routes/routes'
import { COLOR_DARK, COLOR_PRIMARY } from '../utils/constants'

export default function Navbar() {
  return (
    <AppBar position="static" sx={{ bgcolor: COLOR_PRIMARY }}>
      <Container maxWidth="xl">
        <ToolbarWithoutPaddingX>
          <Button component={RouterLink} to="/">
            <Box component="img" src="/assets/images/logo.png" width={160} />
          </Button>
          <Box flexGrow={1} />
          {
            routes.map(route => (
              <Button
                key={route.path}
                component={RouterLink}
                to={route.path}
                sx={{ color: COLOR_DARK }}
              >{route.name}</Button>
            ))
          }
        </ToolbarWithoutPaddingX>
      </Container>
    </AppBar>
  )
}