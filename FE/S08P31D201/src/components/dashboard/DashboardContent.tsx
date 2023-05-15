import styled from '@emotion/styled';
import { Button, Card } from '@mui/material';
import * as d3 from 'd3';

import DashboardCards from '@components/dashboard/DashboardCards';
import ZoomChart from '@components/dashboard/Charts/ZoomChart';
import PieChart from '@components/dashboard/Charts/PieChart';
import ScatterChart from '@components/dashboard/Charts/ScatterChart';
import { tabletV } from '@/utils/Mixin';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { NewReportType, ReportType } from 'ReportTypes';
import {
  CoordinationItemData,
  CountItemData,
  CountTimeData,
  CountTimeItemData,
  CountTimeTeamData,
} from 'ChartTypes';
import { useRecoilValue } from 'recoil';
import DashboardDayAtom from '@/store/DashboardFilter'


function DashboardContent() {
  const [data, setData] = useState<CountTimeData[]>();
  const [eqdata, seteqData] = useState<CountItemData[]>();
  const [ctidata, setCtiData] = useState<CountTimeItemData[]>();
  const [teamdata, setTeamData] = useState<CountTimeTeamData[]>();
  const [teamIndex, setTeamIndex] = useState(0);

  const dashDate = useRecoilValue(DashboardDayAtom);

  // time => Date
  function processData(data: ReportType[]): NewReportType[] {
    return data.map(d => {
      return {
        id: d.id,
        reportItems: d.reportItems,
        team: d.team,
        time: d3.timeParse('%Y-%m-%d')(d.time.slice(0, 10)) as Date,
        cctvArea: d.cctvArea,
        user: d.user,
        x: d.x,
        y: d.y,
      };
    });
  }

  // 시간 별로 count
  function countByTime(data: NewReportType[]): CountTimeData[] {
    const counts = d3.rollup(
      data,
      group => group.length,
      d => d.time // Group by date only (ignoring time)
    );

    return Array.from(counts, ([date, value]) => ({
      date: date,
      value: value.toString(),
    })).sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  // 안전 장구별로 count
  function countByReportItems(data: NewReportType[]): CountItemData[] {
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
  function countByTimeByReportItems(
    data: NewReportType[]
  ): CountTimeItemData[] {
    // 장구 별로 그룹화
    const groupedData = d3.group(
      data.flatMap(d =>
        d.reportItems.map(reportItem => ({ ...d, reportItem }))
      ),
      d => d.reportItem
    );

    const countTimeItemData = new Map();

    groupedData.forEach((values, key) => {
      countTimeItemData.set(key, countByTime(values));
    });

    return Array.from(countTimeItemData, ([key, value]) => {
      return { reportItem: key, value };
    });
  }

  // 팀별로 날짜 별 카운트

  function countByTimeByTeams(data: NewReportType[]): CountTimeTeamData[] {
    const groupData = d3.group(data, d => d.team.teamName);

    const countTimeTeamData = new Map();

    groupData.forEach((values, key) => {
      countTimeTeamData.set(key, countByTime(values));
    });

    return Array.from(countTimeTeamData, ([key, value]) => {
      return { teamName: key, value };
    });
  }

  useEffect(() => {
    const startDate = dashDate.startDay.toISOString().slice(0, 10)
    const endDate = dashDate.endDay.toISOString().slice(0, 10)
    console.log(startDate, endDate)
    axios({
      method: 'GET',
      url: `https://k8d201.p.ssafy.io/api/report?startDate=${startDate}&endDate=${endDate}&equipments=`,
    }).then(res => {
      console.log(res.data.data)
      if (res.data.data.length !== 0) {
        const transformedData = processData(res.data.data);
        // 시간대별로 데이터 그룹화
        const dayData = countByTime(transformedData);
        console.log(dayData)
        setData(dayData);

        // 장구별로 횟수 그룹화
        const eqData = countByReportItems(transformedData);
        seteqData(eqData);

        // 안전 장구별 날짜 데이터
        const ctiData = countByTimeByReportItems(transformedData);
        setCtiData(ctiData);

        const teamData = countByTimeByTeams(transformedData);
        setTeamData(teamData);
      } else {
        setData(undefined)
        seteqData(undefined);
        setCtiData(undefined);
        setTeamData(undefined);
      }
    });
  }, [dashDate]);

  return (
    <DashboardContentDiv>
      {data && (
        <>
          <DashboardCards eqData={eqdata} teamData={teamdata} />
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
              {ctidata &&
                ctidata.map((d, index) => (
                  <EQCard>
                    <h1>{d.reportItem}</h1>
                    <ZoomChart
                      name={d.reportItem + 'def'}
                      data={d.value}
                      color={d3.schemeCategory10[index % 10]}
                      key={d.reportItem + 'zoomChart'}
                    />
                  </EQCard>
                ))}
            </EQChartDiv>
            <TeamZoomCard>
              <h1>팀 별 기간 차트</h1>
              <div>
                {teamdata &&
                  teamdata.map((d, index) => (
                    <Button
                      onClick={() => setTeamIndex(index)}
                      key={d.teamName + 'button'}
                    >
                      {d.teamName}
                    </Button>
                  ))}
              </div>
              <ZoomChart
                name="team"
                data={teamdata && teamdata[teamIndex].value}
              />
            </TeamZoomCard>
          </ChartCardDiv>
        </>
      )}
    </DashboardContentDiv>
  );
}

export default DashboardContent;

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

const DashboardContentDiv = styled.div`
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
