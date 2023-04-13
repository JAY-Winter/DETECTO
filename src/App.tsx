import { createTheme, PaletteMode } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, { useState } from 'react';
import getDesignTokens from './styles/themes';
import NavigationBar from '@components/NavigationBar';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

function App() {
  const [mode, setMode] = useState<PaletteMode>('light');

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
      <button onClick={() => mode === 'dark' ? setMode('light') : setMode('dark')}>AAAAAA</button>
      <StyledDiv css={container}>
        <NavigationBar mode={mode} />
      </StyledDiv>
    </ThemeProvider>
  );
}

const StyledDiv = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.neutral.main};
  transition: all 0.3s ease;
`
const container = css`
  display: flex;
`

export default App;