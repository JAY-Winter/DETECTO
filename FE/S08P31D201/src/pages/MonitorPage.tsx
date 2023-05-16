import { tabletV } from '@/utils/Mixin';
import { css } from '@emotion/react';
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
  const [cctvList, setCctvList] = useState([0, 1, 2, 3]);
  const [monitorDay, setMonitorDay] = useState(dayjs());
  const [fullScreenState, setFullScreenState] = useState<boolean>(false);
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const navSetTimeout = useRef<NodeJS.Timeout | null>(null);

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

  const TouchNavOpenHandler = () => {
    setNavOpen(true);


    if (navSetTimeout.current) {
      clearTimeout(navSetTimeout.current);
    }

    navSetTimeout.current = setTimeout(() => {
      setNavOpen(false);
      if (navSetTimeout.current)
      navSetTimeout.current = null; // 타이머 종료 후 null로 초기화
    }, 2000);
  };

  console.log(navOpen);

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
        <MonitorNav
          open={navOpen}
          onTouchEnd={TouchNavOpenHandler}
          onMouseMove={() => setNavOpen(true)}
          onMouseLeave={() => setNavOpen(false)}
        >
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
            onClick={() => cctvButtonHandler([0, 1, 2, 3])}
          >
            전체
          </Button>
          {fullScreenState ? (
            <Button onClick={exitFullScreen} color="error" variant="contained">
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

  width: 100%;

  ${tabletV} {
    align-items: normal;
  }
`;

const MonitorHeader = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem;

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

  overflow: hidden;

  ${tabletV} {
    flex-direction: column;
  }
`;

const MonitorNav = styled.div<{ open: boolean }>`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;

  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 10;

  width: 50%;
  min-width: 360px;

  ${({ open }) =>
      open
        ? css`
            transform: translate(-50%, -0.5rem);
            button {
              transform: translate(0, 0);
            }
          `
        : css`
            transform: translate(-50%, 3.5rem);
            button {
              transform: translate(0, 2rem);
            }
          `};

  

  height: fit-content;

  background-color: ${props => props.theme.palette.neutral.cardHover};
  border-radius: 2rem;
  margin-right: 1rem;
  padding: 1rem;

  transition: 0.4s ease all;

  button {
    word-break: keep-all;
    height: fit-content;
    transition: 0.5s ease all;

    font-size: 1rem;

    flex-basis: calc(100% / 5 - 1rem);
  }

  ${tabletV} {
    top: 0;

    ${({ open }) =>
      open
        ? css`
            transform: translate(-50%, 0.5rem);
          `
        : css`
            transform: translate(-50%, -3.5rem);
          `};

    button {
      ${({ open }) =>
        open
          ? css`
              transform: translate(0, 0);
            `
          : css`
              transform: translate(0, -3.5rem);
            `};
    }
  }
`;

const MonitorsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  position: relative;
  width: 100%;

  padding-bottom: 40px;

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

    padding-bottom: 0px;
    padding-top: 40px;

    > div {
      flex-basis: 100%;
      height: calc(100vh / 4 - 5px);
    }

    > div:only-child {
      flex-basis: 100%;
      height: 25vh;
    }
  }
`;

const MonitorDatePicker = styled(DatePicker)`
  width: calc(100% - 4rem);
  margin: 2rem;
`;
