import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from '@emotion/react';
import { darkTheme, lightTheme } from '@/styles/themes';
import GlobalStyles from '@/styles/GlobalStyles';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <GlobalStyles />
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </>
);
