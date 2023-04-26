import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NavigationBar from '@components/navbar/NavigationBar'
import NavigationBarTablet from '@components/navbar/NavigationBarTablet'
import DashboardPage from '@/pages/DashboardPage'
import EquipmentManagePage from '@/pages/EquipmentManagePage'
import SummaryPage from '@/pages/SummaryPage'
import MorePage from '@/pages/MorePage'
import styled from '@emotion/styled'
import { mobileV, tabletV } from '@/utils/Mixin'
import ProtectedRoute from '@components/common/ProtectedRoute'

type RootPageProps = {
  mode: 'dark' | 'light',
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>,
}

function RootPage({ mode, setMode }: RootPageProps) {
  return (
    <>
      <NavigationBar mode={mode} setMode={setMode} />
      <NavigationBarTablet mode={mode} setMode={setMode} />
      <RouterContainerDiv>
        <Routes>
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/manage" element={<EquipmentManagePage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/setting" element={<MorePage />} />
        </Routes>
      </RouterContainerDiv>
    </>
  )
}

const RouterContainerDiv = styled.div`
  margin-left: 300px;
  overflow-y: auto;
  color: ${props => props.theme.palette.text.primary};
  ${tabletV} {
    margin-left: 70px;
  }
  ${mobileV} {
    margin-left: 0px;
    padding-bottom: 70px;
  }
`;

export default RootPage