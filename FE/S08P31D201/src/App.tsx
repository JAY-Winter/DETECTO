import { createTheme, PaletteMode } from '@mui/material';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import React, { useEffect, useState } from 'react';
import getDesignTokens from './styles/themes';
import { Route, Routes, Navigate } from 'react-router-dom';
import SignIn from '@/pages/SignIn';
import Root from '@/pages/RootPage';

import DashboardPage from './pages/DashboardPage';
import styled from '@emotion/styled';
import NavigationBar from '@components/navbar/NavigationBar';
import EquipmentManagePage from './pages/EquipmentManagePage';
import { mobileV, tabletV } from './utils/Mixin';
import NavigationBarTablet from '@components/navbar/NavigationBarTablet';
import NavigationBarMobile from '@components/navbar/NavigationBarMobile';
import SummaryPage from './pages/SummaryPage';
import MorePage from './pages/MorePage';
import ProtectedRoute from '@components/common/ProtectedRoute';
import AuthProvider from '@components/common/AuthProvider';


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
        <Routes>
          {/* <Route path="/login" element={<SignIn />} /> */}
          <Route path="/*" element={<Root mode={mode} setMode={setMode} />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
    // <ThemeProvider theme={theme}>
    //   <NavigationBar mode={mode} setMode={setMode} />
    //   <NavigationBarTablet mode={mode} setMode={setMode} />
    //   <RouterContainerDiv>
    //     <Routes>
    //       <Route path="/" element={<Navigate replace to="/dashboard" />} />
    //       <Route path="/dashboard" element={<DashboardPage />} />
    //       <Route path="/manage" element={<EquipmentManagePage />} />
    //       <Route path="/summary" element={<SummaryPage />} />
    //       <Route path="/setting" element={<MorePage />} />
    //     </Routes>
    //   </RouterContainerDiv>
    //   <NavigationBarMobile />
    // </ThemeProvider>
  );
}

// const RouterContainerDiv = styled.div`
//   margin-left: 300px;
//   overflow-y: auto;
//   color: ${props => props.theme.palette.text.primary};
//   ${tabletV} {
//     margin-left: 70px;
//   }
//   ${mobileV} {
//     margin-left: 0px;
//     padding-bottom: 70px;
//   }
// `;

export default App;