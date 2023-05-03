import styled from '@emotion/styled';
import { Button, Card } from '@mui/material';
import * as d3 from 'd3';

import { SpaceDashboard } from '@mui/icons-material';
import DashboardCards from '@components/dashboard/DashboardCards';
import ZoomChart from '@components/dashboard/Charts/ZoomChart';
import PieChart from '@components/dashboard/Charts/PieChart';
import ScatterChart from '@components/dashboard/Charts/ScatterChart';
import { tabletV } from '@/utils/Mixin';
import { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardPage() {
  const [data, setData] = useState();
  const [eqdata, seteqData] = useState();
  const [codata, setCoData] = useState();
  const [ctidata, setCtiData] = useState<{ reportItem: any; value: any; }[]>();

  // time => Date
  function processData(data) {
    return data.map(d => {
      return {
        id: d.id,
        reportItems: d.reportItems,
        team: d.team,
        time: d3.timeParse('%Y-%m-%dT%H:%M:%S')(d.time),
        user: d.user,
        x: d.x,
        y: d.y,
      };
    });
  }

  // 시간 별로 count
  function countByTime(data) {
    const counts = d3.rollup(
      data,
      group => group.length,
      d => d.time // Group by date only (ignoring time)
    );

    return Array.from(counts, ([date, value]) => ({
      date: date,
      value: value.toString(),
    })).sort((a, b) => a.date - b.date);
  }

  // 안전 장구별로 count
  function countByReportItems(data) {
    const counts = d3.rollup(
      data.flatMap(d =>
        d.reportItems.map(reportItem => ({ ...d, reportItem }))
      ),
      group => group.length,
      d => d.reportItem
    );

    return Array.from(counts, ([reportItem, count]) => ({
      reportItem,
      count,
    }));
  }

  // 안전 장구별로 날짜 순 정리
  function countByTimeByReportItems(data) {
    // 장구 별로 그룹화
    const groupedData = d3.group(
      data.flatMap(d =>
        d.reportItems.map(reportItem => ({ ...d, reportItem }))
      ),
      d => d.reportItem
    );
    console.log(groupedData);

    const countTimeItemData = new Map();

    groupedData.forEach((values, key) => {
      countTimeItemData.set(key, countByTime(values));
    });

    return countTimeItemData;
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://k8d201.p.ssafy.io:8000/report?startDate=2023-04-01&endDate=2023-05-05&equipments=',
    }).then(res => {
      const transformedData = processData(res.data.data);

      // 시간대별로 데이터 그룹화
      const dayData = countByTime(transformedData);
      setData(dayData);

      // 장구별로 횟수 그룹화
      const eqData = countByReportItems(transformedData);
      seteqData(eqData);

      // 안전장구별로 위치
      const coData = transformedData.flatMap(d =>
        d.reportItems.map(reportItem => ({ reportItem, x: d.x, y: d.y }))
      );
      setCoData(coData);

      // 안전 장구별 날짜 데이터
      const ctiData = Array.from(countByTimeByReportItems(transformedData), ([key, value]) => {
        return { reportItem: key, value };
      });
      setCtiData(ctiData);
    });
  }, []);

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
        <DashboardCards eqData={eqdata}/>
        <ChartCardDiv>
          <TotalChartDiv>
            <ZoomCard>
              <h1>전체 기간 차트</h1>
              <ZoomChart name="allDay" data={data} />
            </ZoomCard>
            <PieCard>
              <h1>파이차트</h1>
              <PieChart data={eqdata} />
            </PieCard>
          </TotalChartDiv>
          <EQChartDiv>
            {ctidata && ctidata.map((d, index) => (<EQCard>
              <h1>{d.reportItem}</h1>
              <ZoomChart name={d.reportItem + "def"} data={d.value} color={d3.schemeCategory10[index % 10]} key={d.reportItem + "zoomChart"}/>
            </EQCard>))}
          </EQChartDiv>
          <ScatterCard>
            <h1>위치</h1>
            <ScatterChart data={codata} />
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
            <ZoomChart name="team" data={data} />
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
