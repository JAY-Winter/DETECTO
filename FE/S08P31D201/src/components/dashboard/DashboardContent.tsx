import styled from '@emotion/styled';
import { Button, Card } from '@mui/material';
import * as d3 from 'd3';

import DashboardCards from '@components/dashboard/DashboardCards';
import ZoomChart from '@components/dashboard/Charts/ZoomChart';
import PieChart from '@components/dashboard/Charts/PieChart';
import ScatterChart from '@components/dashboard/Charts/ScatterChart';
import { tabletV } from '@/utils/Mixin';
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { NewReportType, ReportType } from 'ReportTypes';
import {
  CoordinationItemData,
  CountItemData,
  CountTimeData,
  CountTimeItemData,
  CountTimeTeamData,
} from 'ChartTypes';
import { useRecoilValue } from 'recoil';
import DashboardDayAtom from '@/store/DashboardFilter';
import useAxios from '@/hooks/useAxios';
import { RequestObj } from 'AxiosRequest';

import SamLogoLight from '@/assets/img/samlogoLight.svg';
import SamLogoDark from '@/assets/img/samlogoDark.svg';
import { css, useTheme } from '@emotion/react';

function DashboardContent() {
  const [timedata, settimeData] = useState<CountTimeData[]>();
  const [eqdata, seteqData] = useState<CountItemData[]>();
  const [ctidata, setCtiData] = useState<CountTimeItemData[]>();
  const [teamdata, setTeamData] = useState<CountTimeTeamData[]>();
  const [teamIndex, setTeamIndex] = useState(0);

  const theme = useTheme();

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

  // useEffect(() => {
  //   const startDate = dashDate.startDay.toISOString().slice(0, 10)
  //   const endDate = dashDate.endDay.toISOString().slice(0, 10)
  //   console.log(startDate, endDate)
  //   axios({
  //     method: 'GET',
  //     url: `https://k8d201.p.ssafy.io/api/report?startDate=${startDate}&endDate=${endDate}&equipments=`,
  //   }).then(res => {
  //     console.log(res.data.data)
  //     if (res.data.data.length !== 0) {
  //       const transformedData = processData(res.data.data);
  //       // 시간대별로 데이터 그룹화
  //       const dayData = countByTime(transformedData);
  //       console.log(dayData)
  //       setData(dayData);

  //       // 장구별로 횟수 그룹화
  //       const eqData = countByReportItems(transformedData);
  //       seteqData(eqData);

  //       // 안전 장구별 날짜 데이터
  //       const ctiData = countByTimeByReportItems(transformedData);
  //       setCtiData(ctiData);

  //       const teamData = countByTimeByTeams(transformedData);
  //       setTeamData(teamData);
  //     } else {
  //       setData(undefined)
  //       seteqData(undefined);
  //       setCtiData(undefined);
  //       setTeamData(undefined);
  //     }
  //   });
  // }, [dashDate]);

  const tryHandler = (response: AxiosResponse) => {
    if (response.status === 200) {
      if (response.data.data.length !== 0) {
        const transformedData = processData(response.data.data);
        // 시간대별로 데이터 그룹화
        const dayData = countByTime(transformedData);
        console.log(dayData);
        settimeData(dayData);

        // 장구별로 횟수 그룹화
        const eqData = countByReportItems(transformedData);
        seteqData(eqData);

        // 안전 장구별 날짜 데이터
        const ctiData = countByTimeByReportItems(transformedData);
        setCtiData(ctiData);

        const teamData = countByTimeByTeams(transformedData);
        setTeamData(teamData);
      } else {
        settimeData(undefined);
        seteqData(undefined);
        setCtiData(undefined);
        setTeamData(undefined);
      }
    }
  };

  const catchHandler = (errorCode: number) => {
    switch (errorCode) {
      case 400:
        alert('인증되지 않은 사용자입니다.');
        break;
      case 401:
        alert('인증되지 않은 요청입니다');
        break;
      case 404:
        alert('리소스를 찾을 수 없습니다');
        break;
      case 500:
        alert('서버에서 오류가 발생했습니다');
        break;
      default:
        alert('알 수 없는 에러...');
    }
  };

  const [data, isLoading, setRequestObj] = useAxios({
    tryHandler: tryHandler,
    catchHandler: catchHandler,
    baseURL: 'https://detecto.kr/api/',
  });

  useEffect(() => {
    const startDate = dashDate.startDay.toISOString().slice(0, 10);
    const endDate = dashDate.endDay.toISOString().slice(0, 10);
    const requestObj: RequestObj = {
      url: `report?startDate=${startDate}&endDate=${endDate}&equipments=`,
      method: 'get',
    };
    setRequestObj(requestObj);
  }, [dashDate]);

  return (
    <DashboardContentDiv>
      {timedata ? (
        <>
          <DashboardCards eqData={eqdata} teamData={teamdata} />
          <ChartCardDiv>
            <TotalChartDiv>
              <ZoomCard>
                <h1>전체 기간 차트</h1>
                <ZoomChart name="allDay" data={timedata} />
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
      ) : (
        <NoContentDiv>
          <img
            css={logoContainer}
            src={theme.palette.mode === 'light' ? SamLogoLight : SamLogoDark}
          />
          <p>데이터가 존재하지 않습니다.</p>
        </NoContentDiv>
      )}
    </DashboardContentDiv>
  );
}

export default DashboardContent;

const ChartCard = styled(Card)`
  padding: 1rem;
  border-radius: 1rem;
  margin: 1rem;
  box-shadow: 5px 5px 10px 5px ${props => props.theme.palette.neutral.cardHover};
  flex-basis: calc(50% - 2rem);

  ${tabletV} {
    margin-left: 0;
    margin-right: 0;
    flex-basis: 100%;
  }
`;

const DashboardContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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
  ${tabletV} {
    width: 100%;
  }
`;

const PieCard = styled(ChartCard)`
  display: flex;
  flex-direction: column;

  width: 100%;

  justify-content: center;
  align-items: center;
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

  flex-basis: calc(100% / 3 - 2rem);

  ${tabletV} {
    width: 100%;
  }
`;

const ScatterCard = styled(ChartCard)``;

const TeamZoomCard = styled(ChartCard)``;

const NoContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  font-size: 2rem;
`;

const logoContainer = css`
  width: 100%;
  height: 3rem;
  /* padding: 0px 10px; */
  /* margin-left: 10px; */
  margin: 10px 0px 30px 0px;
`;