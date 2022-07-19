import { BrowserRouter } from 'react-router-dom';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import './App.css'
import Routes from './Routes';
import { AlertMessageProvider } from './contexts/AlertMessageContext';
import Loading from './components/Loading';
import AlertMessage from './components/AlertMessage';
import { COLOR_PRIMARY, COLOR_PRIMARY_DARK, COLOR_PRIMARY_LIGHT } from './utils/constants';

let theme = createTheme({
  palette: {
    primary: {
      main: COLOR_PRIMARY,
      light: COLOR_PRIMARY_LIGHT,
      dark: COLOR_PRIMARY_DARK
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'capitalize'
        }
      }
    }
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
