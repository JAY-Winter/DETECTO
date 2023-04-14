import { createTheme, PaletteMode } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, { useEffect, useState } from 'react';
import DashboardPage from './pages/DashboardPage';
import getDesignTokens from './styles/themes';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Route, Routes, Navigate } from "react-router-dom";
import NavigationBar from '@components/navbar/NavigationBar';
import EquipmentManagePage from './pages/EquipmentManagePage';
import DummyDashboard from '@components/dummies/DummyDashboard';
import DummyManage from '@components/dummies/DummyManage';
import DummySummary from '@components/dummies/DummySummary';

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

  // 테마 따라 body 태그의 백그라운드 색상 결정
  useEffect(() => {
    if (mode === 'light') {
      document.body.style.backgroundColor = '#fff';
    } else if (mode === 'dark') {
      document.body.style.backgroundColor = '#121212';
    }
  }, [mode])

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <StyledDiv css={container}>
        <NavigationBar mode={mode} setMode={setMode} />
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path='/dashboard' element={<DashboardPage />} />
          <Route path='/manage' element={<EquipmentManagePage />} />
          <Route path='/summary' />
        </Routes>
      </StyledDiv>
    </ThemeProvider>
  );
}

const StyledDiv = styled.div`
  display: flex;
  background-color: ${props => props.theme.palette.neutral.main};
  transition: background-color 0.3s ease;
  height: 100vh;
  overflow-y: auto;
`
const container = css`
  display: flex;
`

export default App;