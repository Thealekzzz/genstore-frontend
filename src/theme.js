import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    button: {
      fontSize: 12,
    },
  },
  palette: {
    primary: {
      main: '#3580E8',
      dark: '#1d6fe9',
    },
    paper: {
      main: '#FFF'
    },
    background: {
      black: '#000',
    },
    text: {
      white: '#FFF',
      light: '#A0A0A0',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1280,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          margin: 0,
          backgroundColor: '#EBEDF0',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        'MuiInputBase-input': {
          border: '2px solid #3580E8',
        }
      },
    },
  },
});
