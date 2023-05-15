import { tabletV } from '@/utils/Mixin';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Monitor from '@components/monitor/Monitor';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

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
          <div>
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
          </div>
          <div>
            {fullScreenState ? (
              <Button
                onClick={exitFullScreen}
                color="error"
                variant="contained"
              >
                <FullscreenExitIcon />
              </Button>
            ) : (
              <Button
                onClick={enterFullScreen}
                color="success"
                variant="contained"
              >
                <FullscreenIcon />
              </Button>
            )}
          </div>
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
  flex-direction: column;
  justify-content: space-between;

  position: absolute;
  left: 0;
  z-index: 10;
  overflow: hidden;

  width: 10px;

  height: calc(100vh);

  background-color: ${props => props.theme.palette.neutral.card};
  border-radius: 0 1rem 1rem 0;
  margin-right: 1rem;
  padding: 1rem;

  transition: 0.3s ease all;

  button {
    margin-top: 1rem;
    word-break: keep-all;
    height: fit-content;
    transform: translate(-100px, 0);
    transition: 0.3s ease all;
    padding-top: 25%;
    padding-bottom: 25%;

    font-size: 1rem;
  }

  :hover {
    width: 100px;
    button {
      transform: translate(0, 0);
    }
  }
  ${tabletV} {
    flex-direction: row;
    width: 100%;
    height: fit-content;
    max-height: 10px;
    justify-content: space-around;
    margin-right: 0;
    margin-bottom: 1rem;

    border-radius: 0 0 1rem 1rem;

    top: 0;

    button {
      margin-top: auto;
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
      word-break: keep-all;
      height: fit-content;
      transform: translate(0, -200px);
      transition: 0.3s ease all;

      padding-top: 0.5rem;
      padding-bottom: 0.5rem;
    }

    :hover {
      max-height: 100vh;
      width: 100%;
      button {
        transform: translate(0, 0);
      }
    }
  }
`;

const MonitorsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  width: 100%;

  padding-left: 40px;

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

    padding-left: 0px;
    padding-top: 50px;

    > div {
      flex-basis: 100%;
      height: calc(100vh / 3 - 15px);
    }

    > div:only-child {
      flex-basis: 100%;
      height: 33vh;
    }
  }
`;

const MonitorDatePicker = styled(DatePicker)`
  width: 100%;
  margin-bottom: 1rem;
`;
