import styled from '@emotion/styled';
import { Button, Card } from '@mui/material';
import { useState } from 'react';
import * as d3 from 'd3';

import {
  SpaceDashboard,
  VideoCameraFrontOutlined,
  Groups,
  CalendarMonth,
  Engineering,
} from '@mui/icons-material';
import MultiLineChart from '@components/summary/Charts/MultiLineChart';
import SummaryCards from '@components/summary/SummaryCards';
import ZoomChart from '@components/summary/Charts/ZoomChart';

function SummaryPage() {
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
    <SummaryContainer>
      <SummaryHeader>
        <Card>
          <SpaceDashboard />
        </Card>
        <h1>대시보드</h1>
      </SummaryHeader>
      <SummaryContent>
        <Card sx={{ height: '3rem', marginBottom: '1rme' }}>날짜선택기</Card>
        <SummaryCards />
        <Card>
          <ZoomChart />
        </Card>
      </SummaryContent>
    </SummaryContainer>
  );
}

export default SummaryPage;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SummaryHeader = styled.div`
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

const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 4rem);
  margin: 2rem;
`;
