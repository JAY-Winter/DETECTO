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
import MonitorPage from './pages/MonitorPage';
import { useRecoilValue } from 'recoil';
import { UserInfo } from './store/userInfoStroe';
import WorkerNavigationBar from '@components/navbar/WorkerNavigationBar';
import WorkerNavigationBarTablet from '@components/navbar/WorkerNavigationBarTablet';
import WorkerNavigationBarMobile from '@components/navbar/WorkerNavigationBarMobile';
import FoulPage from './pages/FoulPage';
import IssuePage from './pages/IssuePage';

function App() {
  const [mode, setMode] = useState<PaletteMode>('light');
  const userInfo = useRecoilValue(UserInfo);

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

  console.log(userInfo);

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        {userInfo.type === 'admin' ? (
          <>
            <NavigationBar setMode={setMode} />
            <NavigationBarTablet setMode={setMode} />
            <RouterContainerDiv>
              <Routes>
                <Route path="/" element={<Navigate replace to="/history" />} />
                <Route path="/history" element={<HistoryPage />} />
                <Route path="/manage" element={<EquipmentManagePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/monitor" element={<MonitorPage />} />
                <Route path="/more" element={<MorePage setMode={setMode} />} />
              </Routes>
            </RouterContainerDiv>
            <NavigationBarMobile />
          </>
        ) : (
          <>
            <WorkerNavigationBar setMode={setMode} />
            <WorkerNavigationBarTablet setMode={setMode} />
            <RouterContainerDiv>
              <Routes>
                <Route path="/" element={<Navigate replace to="/foul" />} />
                <Route path="/foul" element={<FoulPage />} />
                <Route path="/issue" element={<IssuePage />} />
                <Route path="/more" element={<MorePage setMode={setMode} />} />
              </Routes>
            </RouterContainerDiv>
            <WorkerNavigationBarMobile />
          </>
        )}
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
