import styled from '@emotion/styled';
import { Button, Card } from '@mui/material';
import * as d3 from 'd3';

import { SpaceDashboard } from '@mui/icons-material';
import DashboardCards from '@components/dashboard/DashboardCards';
import ZoomChart from '@components/dashboard/Charts/ZoomChart';
import PieChart from '@components/dashboard/Charts/PieChart';
import ScatterChart from '@components/dashboard/Charts/ScatterChart';
import { mobileV, tabletV } from '@/utils/Mixin';
import { useEffect, useState } from 'react';
import axios from 'axios';

// 클립의 공통적용

function DashboardPage() {
  // const data = [
  //   { name: ['a', 'b'] },
  //   { name: ['a', 'd'] },
  //   { name: ['a', 'c'] },
  // ];
  // const groupedData = d3.group(
  //   [...data.flatMap(d => d.name.map(n => ({ name: n, data: d })))],
  //   d => d.name
  // );
  // console.log(groupedData);

  const [data, setData] = useState<d3.DSVParsedArray<{
    date: Date | null;
    value: string | undefined;
  }>>();

  useEffect(() => {
    d3.csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',
      function (d) {
        return {
          date: d3.timeParse('%Y-%m-%d')(d.date as string),
          value: d.value,
        };
      }
    ).then(d => setData(d));
  }, []);

  useEffect(() => {

      axios({
      method: 'GET',
      url: 'http://k8d201.p.ssafy.io:8000/report?startDate=2023-04-01&endDate=2023-05-05&equipments='
    }).then(data => console.log(data))}, [])

  return (
    <DashboardContainer>
      <DashboardHeader>
        <Card>
          <SpaceDashboard />
        </Card>
        <h1>대시보드</h1>
      </DashboardHeader>
      <DashboardContent>
        <Card sx={{ height: '3rem', marginBottom: '1rem' }}>날짜선택기</Card>
        <DashboardCards />
        <ChartCardDiv>
          <TotalChartDiv>
            <ZoomCard>
              <h1>전체 기간 차트</h1>
              <ZoomChart name="allDay" data={data} />
            </ZoomCard>
            <PieCard>
              <h1>파이차트</h1>
              <PieChart />
            </PieCard>
          </TotalChartDiv>
          <EQChartDiv>
            <EQCard>
              <h1>안전모</h1>
              <ZoomChart name="ha" data={data} color={'blue'}/>
            </EQCard>
            <EQCard>
              <h1>장갑</h1>
              <ZoomChart name="hand" data={data} color={'orange'} />
            </EQCard>
            <EQCard>
              <h1>앞치마</h1>
              <ZoomChart name="ap" data={data} color={'green'}/>
            </EQCard>
            <EQCard>
              <h1>보안경</h1>
              <ZoomChart name="gl" data={data} color={'red'}/>
            </EQCard>
            <EQCard>
              <h1>팔토시</h1>
              <ZoomChart name="to" data={data} color={'purple'}/>
            </EQCard>
          </EQChartDiv>

          <ScatterCard>
            <h1>위치</h1>
            <ScatterChart />
          </ScatterCard>
          <TeamZoomCard>
            <h1>팀 별 기간 차트</h1>
            <div>
              <Button>전체</Button>
              <Button>1팀</Button>
              <Button>2팀</Button>
              <Button>3팀</Button>
              <Button>4팀</Button>
            </div>
            <ZoomChart name="team" data={data}/>
          </TeamZoomCard>
        </ChartCardDiv>
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

const ChartCard = styled(Card)`
  padding: 1rem;
  margin: 1rem;
  border-radius: 1rem;
  box-shadow: 5px 5px 10px 5px ${props => props.theme.palette.neutral.cardHover};

  ${tabletV} {
    margin-left: 0;
    margin-right: 0;
  }
`;

const DashboardContent = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 4rem);
  margin: 2rem;
`;

const ChartCardDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TotalChartDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
`;

const ZoomCard = styled(ChartCard)`
  width: 60%;

  ${tabletV} {
    width: 100%;
  }
`;

const PieCard = styled(ChartCard)`
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 25rem;

  justify-content: center;
  align-items: center;

  ${tabletV} {
    width: 100%;
    height: 25rem;
  }
`;

const EQChartDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: start;
`;

const EQCard = styled(ChartCard)`
  width: calc(33% - 2rem);

  ${tabletV} {
    width: 100%;
  }
`;

const ScatterCard = styled(ChartCard)``;

const TeamZoomCard = styled(ChartCard)``;
