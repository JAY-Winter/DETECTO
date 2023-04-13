import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { createTheme, PaletteMode } from '@mui/material';
import Button from '@mui/material/Button';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, { useState } from 'react';
import getDesignTokens from './styles/themes';

function App() {
  const [mode, setMode] = useState<PaletteMode>('dark');

  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) =>
          prevMode === 'light' ? 'dark' : 'light'
        );
      },
    }),
    []
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <div>
        App
      </div>
    </ThemeProvider>
  );
}

export default App;
