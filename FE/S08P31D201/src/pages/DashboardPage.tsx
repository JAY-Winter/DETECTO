import styled from '@emotion/styled';
import { Button, Card } from '@mui/material';

import { SpaceDashboard } from '@mui/icons-material';
import DashboardContent from '@components/dashboard/DashboardContent';
import DashboardDatePicker from '@components/dashboard/DashboardDatePicker';
import { tabletV } from '@/utils/Mixin';

function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <SpaceDashboard />
        <h1>대시보드</h1>
      </DashboardHeader>
      <DashboardDatePicker />
      <DashboardContentPaper>
        <DashboardContent />
      </DashboardContentPaper>
    </DashboardContainer>
  );
}

export default DashboardPage;

const DashboardContainer = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  align-items: center;
  padding: 2.5rem 2rem;
  ${tabletV} {
    align-items: normal;
  }
`;

const DashboardHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0rem 0rem 2rem;

  svg {
    font-size: 2.5rem;
    margin-right: 1rem;
  }
`;

const DashboardContentPaper = styled.div`
  width: 100%;
  min-height: 60vh;

  ${tabletV} {
    margin-left: 0;
    margin-right: 0;
  }
`;
