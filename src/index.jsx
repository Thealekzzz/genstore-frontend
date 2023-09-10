import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme.js';
import { CssBaseline } from '@mui/material';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <HashRouter>
        <CssBaseline />
        <App />
      </HashRouter>
    </ThemeProvider>
  </React.StrictMode>
);

