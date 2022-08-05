import { BrowserRouter } from 'react-router-dom';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import './App.css'
import Routes from './Routes';
import { AlertMessageProvider } from './contexts/AlertMessageContext';
import Loading from './components/Loading';
import AlertMessage from './components/AlertMessage';
import { COLOR_DARK, COLOR_PRIMARY, COLOR_PRIMARY_DARK, COLOR_PRIMARY_LIGHT, COLOR_WHITE } from './utils/constants';

let theme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
      light: COLOR_PRIMARY_LIGHT,
      dark: COLOR_PRIMARY_DARK
    },
    secondary: {
      main: COLOR_PRIMARY,
      light: COLOR_WHITE,
      dark: COLOR_DARK
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: COLOR_WHITE
          }
        }
      ]
    },
  }
})
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AlertMessageProvider>
        <BrowserRouter>
          <Routes />
          <Loading />
          <AlertMessage />
        </BrowserRouter>
      </AlertMessageProvider>
    </ThemeProvider>
  );
}

export default App
