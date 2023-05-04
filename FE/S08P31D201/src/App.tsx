import { createTheme, PaletteMode } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, { useEffect, useMemo, useState } from 'react';
import getDesignTokens from './styles/themes';
import { Route, Routes, Navigate } from 'react-router-dom';

import HistoryPage from './pages/HistoryPage';
import styled from '@emotion/styled';
import NavigationBar from '@components/navbar/NavigationBar';
import EquipmentManagePage from './pages/EquipmentManagePage';
import { mobileV, tabletV } from './utils/Mixin';
import NavigationBarTablet from '@components/navbar/NavigationBarTablet';
import NavigationBarMobile from '@components/navbar/NavigationBarMobile';
import DashboardPage from './pages/DashboardPage';
import MorePage from './pages/MorePage';
import AuthProvider from '@components/common/AuthProvider';
import CCTVPage from './pages/CCTVPage';


function App() {
  const [mode, setMode] = useState<PaletteMode>('light');

  // useMemo(() => {
  //   // The dark mode switch would invoke this method
  //   toggleColorMode: () => {
  //     setMode((prevMode: PaletteMode) => prevMode === 'light' ? 'dark' : 'light');
  //   }
  // }, []);

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  // 테마 따라 body 태그의 백그라운드 색상 결정
  useEffect(() => {
    if (mode === 'light') {
      document.body.style.backgroundColor = '#fff';
    } else if (mode === 'dark') {
      document.body.style.backgroundColor = '#121212';
    }
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <NavigationBar setMode={setMode} />
        <NavigationBarTablet setMode={setMode} />
        <RouterContainerDiv>
          <Routes>
            <Route path="/" element={<Navigate replace to="/history" />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/manage" element={<EquipmentManagePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/more" element={<MorePage setMode={setMode} />} />

            <Route path="/cctv" element={<CCTVPage />} />

          </Routes>
        </RouterContainerDiv>
        <NavigationBarMobile />
      </AuthProvider>
    </ThemeProvider>
  );
}

const RouterContainerDiv = styled.div`
  margin-left: 300px;
  overflow-y: auto;
  height: 100%;
  color: ${props => props.theme.palette.text.primary};
  ${tabletV} {
    margin-left: 70px;
  }
  ${mobileV} {
    margin-left: 0px;
    padding-bottom: 70px;
  }
`;

export default App;