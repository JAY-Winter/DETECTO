import styled from '@emotion/styled';
import {
  Button,
  Card,
} from '@mui/material';

import { SpaceDashboard } from '@mui/icons-material';
import DashboardContent from '@components/dashboard/DashboardContent';
import DashboardDatePicker from '@components/dashboard/DashboardDatePicker';

function DashboardPage() {
  return (
    <DashboardContainer>
      <DashboardHeader>
        <Card>
          <SpaceDashboard />
        </Card>
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
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const DashboardHeader = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: row;

  .MuiCard-root {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
    margin-right: 0.5rem;

    background-color: ${props => props.theme.palette.primary.main};

    svg {
      color: ${props => props.theme.palette.primary.contrastText};
    }
  }
`;

const DashboardContentPaper = styled.div`
  min-height: 60vh;

  margin: 0 1rem 1rem 1rem;
  border-radius: 0 0 0.5rem 0.5rem;

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
