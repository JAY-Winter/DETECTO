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

// const DashboardContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   /* width: calc(100% - 4rem);
//   margin: 2rem; */

//   width: 100%;
// `;

const ChartCardDiv = styled.div`
  display: flex;
  flex-direction: column;

  box-shadow: 5px 5px 10px 5px ${props => props.theme.palette.neutral.cardHover};
`;

const DateButtonDiv = styled.div`
  margin: 1rem 1rem 0 1rem;
`;

const DateButton = styled(Button)`
  border-bottom: none;
  border-radius: 0.5rem 0.5rem 0 0;
  box-shadow: none;

  :hover {
    border-bottom: none;
  }
`;
