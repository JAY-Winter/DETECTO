import styled from '@emotion/styled';
import { Card } from '@mui/material';
import * as d3 from 'd3';

import { SpaceDashboard } from '@mui/icons-material';
import DashboardCards from '@components/dashboard/DashboardCards';
import ZoomChart from '@components/dashboard/Charts/ZoomChart';
import PieChart from '@components/dashboard/Charts/PieChart';

function DashboardPage() {
  const data = [
    { name: ['a', 'b'] },
    { name: ['a', 'd'] },
    { name: ['a', 'c'] },
  ];
  const groupedData = d3.group(
    [...data.flatMap(d => d.name.map(n => ({ name: n, data: d })))],
    d => d.name
  );
  console.log(groupedData);

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Card>
          <SpaceDashboard />
        </Card>
        <h1>대시보드</h1>
      </DashboardHeader>
      <DashboardContent>
        <Card sx={{ height: '3rem', marginBottom: '1rme' }}>날짜선택기</Card>
        <DashboardCards />
        <HistoryCardDiv>
          <Card sx={{width: '100%', height: '100%'}}>
            <ZoomChart />
          </Card>
          <Card sx={{width: '100%', height: '100%'}}>
            <PieChart />
          </Card>
        </HistoryCardDiv>
      </DashboardContent>
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

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 4rem);
  margin: 2rem;
`;

const HistoryCardDiv = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  grid-template-columns:2fr 1fr;
  column-gap: 1rem;
  row-gap: 1rem;
  margin-top: 1.5rem;
`;
