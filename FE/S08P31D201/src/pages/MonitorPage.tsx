import { tabletV } from '@/utils/Mixin';
import styled from '@emotion/styled';
import { Button, Card } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Monitor from '@components/monitor/Monitor';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import HistoryDatepicker from '@components/history/Date/HistoryDatepicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { set } from 'lodash';

function MonitorPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cctvList, setCctvList] = useState([0, 1, 2]);
  const [monitorDay, setMonitorDay] = useState(dayjs());
  const [fullScreenState, setFullScreenState] = useState<boolean>(false);

  function enterFullScreen() {
    if (containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    }
  }

  function exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  function handleFullScreenChange() {
    if (document.fullscreenElement) {
      // 전체화면 진입
      setFullScreenState(true);
    } else {
      // 전체 화면 모드 종료
      setFullScreenState(false);
    }
  }
  
  useEffect(() => {
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    enterFullScreen();

    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  const cctvButtonHandler = (list: number[]) => {
    setCctvList(list);
  };

  const DateChangeHandler = (newValue: Dayjs) => {
    setMonitorDay(newValue);
  };

  return (
    <MonitorContainer>
      <MonitorHeader>
        <VideocamOutlinedIcon />
        <h1>모니터링</h1>
        <Button onClick={enterFullScreen}>풀스크린 버튼</Button>
      </MonitorHeader>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MonitorDatePicker
          onChange={value => DateChangeHandler(value as Dayjs)}
          value={monitorDay}
          label="날짜 선택"
          format="YYYY.MM.DD"
          maxDate={dayjs()}
        />
      </LocalizationProvider>
      <MonitorContentsDiv ref={containerRef}>
        <MonitorNav>
          <Button variant="contained" onClick={() => cctvButtonHandler([0])}>
            1번
          </Button>
          <Button variant="contained" onClick={() => cctvButtonHandler([1])}>
            2번
          </Button>
          <Button variant="contained" onClick={() => cctvButtonHandler([2])}>
            3번
          </Button>
          <Button
            variant="contained"
            onClick={() => cctvButtonHandler([0, 1, 2])}
          >
            전체
          </Button>
          {fullScreenState ? (
            <Button onClick={exitFullScreen}>
              <span>전체 화면 나가기</span>
            </Button>
          ) : (
            <Button onClick={enterFullScreen}>
              <span>전체 화면 모드</span>
            </Button>
          )}
        </MonitorNav>
        <MonitorsDiv>
          {cctvList.map(id => {
            return (
              <Monitor
                key={'cctvScreen' + id}
                monitorId={id}
                date={monitorDay}
              />
            );
          })}
        </MonitorsDiv>
      </MonitorContentsDiv>
    </MonitorContainer>
  );
}

export default MonitorPage;

const MonitorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  ${tabletV} {
    align-items: normal;
  }
`;

const MonitorHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0rem 0rem 2rem;

  svg {
    font-size: 2.5rem;
    margin-right: 1rem;
  }
`;

const MonitorContentsDiv = styled.div`
  display: flex;

  width: 100%;

  flex-direction: row;
  position: relative;

  justify-content: center;
  align-items: center;

  ${tabletV} {
    flex-direction: column;
  }
`;

const MonitorNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: calc(100vh);
  width: 100px;

  background-color: ${props => props.theme.palette.neutral.card};
  border-radius: 1rem;
  margin-right: 1rem;
  padding: 1rem;

  button {
    margin-bottom: 0.5rem;
    word-break: keep-all;
  }

  ${tabletV} {
    width: 100%;
    height: fit-content;
    justify-content: space-around;
    margin-right: 0;
    margin-bottom: 1rem;
  }
`;

const MonitorsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  width: 100%;

  > div {
    flex-basis: 50%;
    height: 50vh;
  }

  > div:only-child {
    flex-basis: 100%;
    height: 100vh;
  }

  ${tabletV} {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    > div {
      flex-basis: 100%;
      height: 30vh;
    }

    > div:only-child {
      flex-basis: 100%;
      height: 30vh;
    }
  }
`;

const MonitorDatePicker = styled(DatePicker)`
  width: 100%;
  margin-bottom: 1rem;
`;
