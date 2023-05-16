import { css, useTheme } from '@emotion/react';
import { Button, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import CircleIcon from '@mui/icons-material/Circle';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';
import styled from '@emotion/styled';
import dayjs, { Dayjs } from 'dayjs';
import MonitorLoading from './MonitorLoading';

import SamLogoLight from '@/assets/img/samlogoLight.svg';
import SamLogoDark from '@/assets/img/samlogoDark.svg';

function Monitor({ monitorId, date }: { monitorId: number; date: Dayjs }) {
  const theme = useTheme();
  const [img, setImg] = useState<string>();
  const currentOffset = useRef<number>(1);
  const ws = useRef<WebSocket>();
  const [maxoffset, setMaxOffset] = useState<number>(2);
  const [pause, setPause] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');

  const [hoverd, setHoverd] = useState<boolean>(false);
  const videoSetTimeout = useRef<NodeJS.Timeout | null>(null);

  const [movingOffset, setMovingOffset] = useState<number | null>(null);

  const [middleShow, setMiddleShow] = useState<boolean>(false);

  async function connectWebSocket(date: number) {
    const websocket = new WebSocket(
      `wss://detecto.kr/fast?cctvnumber=${monitorId}&partition=${date}`
    );

    // const websocket = new WebSocket(
    //   `ws://k8d201.p.ssafy.io:7005/wss?cctvnumber=${monitorId}&partition=129`
    // );

    websocket.onmessage = async event => {
      const frameData = event.data;
      const data = JSON.parse(frameData);

      setImg('data:image/jpeg;base64,' + data['frame']);
      setMaxOffset(data.total - 1);
      currentOffset.current = data.offset - 1;

      const timestamp = data.timestamp;
      var timestampDate = new Date(timestamp);
      var hours = timestampDate.getHours();
      var minutes = timestampDate.getMinutes();
      var seconds = timestampDate.getSeconds();

      var minutesString = (minutes < 10 ? '0' : '') + minutes;
      var secondsString = (seconds < 10 ? '0' : '') + seconds;

      var timestampString = hours + ':' + minutesString + ':' + secondsString;
      setTime(timestampString);
    };

    websocket.onclose = () => {
      console.log('close됨');
    };

    websocket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    websocket.onerror = event => {
      console.error('WebSocket error observed:', event);
    };

    ws.current = websocket;
  }

  useEffect(() => {
    if (ws.current) ws.current.close();
    axios({
      method: 'get',
      url: `https://detecto.kr/fast/max_offset?cctvnumber=${monitorId}&partition=${date.diff(
        dayjs(date).startOf('year'),
        'day'
      )}`,
    }).then(res => {
      setMaxOffset(res.data.offsets);
    });
    connectWebSocket(date.diff(dayjs(date).startOf('year'), 'day'));
    return () => {
      if (ws.current && ws.current.OPEN) {
        ws.current.close();
      }
    };
  }, [date]);

  const inputChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOffset = Number(e.currentTarget.value);
    setMovingOffset(newOffset);
  };

  const inputMouseUpHandler = async () => {
    if (
      ws.current &&
      ws.current.readyState === WebSocket.OPEN &&
      movingOffset
    ) {
      ws.current.send(JSON.stringify({ offset: 2 + movingOffset, type: 3 }));
      setTimeout(() => {
        setMovingOffset(null);
      }, 1000);
    } else {
      console.error('웹소켓이 열려있지 않습니다.');
    }
  };

  const pauseHandler = () => {
    if (!hoverd) {
      return;
    }
    setMiddleShow(true);
    setPause(prev => {
      console.log(prev);
      if (ws.current) {
        if (!prev) {
          ws.current.send(JSON.stringify({ type: 1 }));
        } else {
          ws.current.send(JSON.stringify({ type: 1 }));
        }
      } else {
        console.log('웹소켓이 열려있지 않습니다.');
      }
      return !prev;
    });
    setTimeout(() => {
      setMiddleShow(false);
    }, 1000);
  };

  const hoverHandler = () => {
    setTimeout(() => setHoverd(true), 100);

    if (videoSetTimeout.current) {
      clearTimeout(videoSetTimeout.current);
    }

    videoSetTimeout.current = setTimeout(() => {
      setHoverd(false);
      if (videoSetTimeout.current) videoSetTimeout.current = null; // 타이머 종료 후 null로 초기화
    }, 3000);
  };

  const realTimeHandler = () => {
    if (ws.current) {
      if (pause) {
        setPause(false);
        ws.current.send(JSON.stringify({ type: 1 }));
      }
      ws.current.send(JSON.stringify({ type: 2 }));
    }
  };

  if (maxoffset === 0) {
    return (
      <NocontentDiv>
        <img
          css={logoContainer}
          src={theme.palette.mode === 'light' ? SamLogoLight : SamLogoDark}
        />
      </NocontentDiv>
    );
  }
  if (ws.current && ws.current.readyState !== WebSocket.OPEN) {
    return <MonitorLoading />;
  }

  return (
    <MonitorDiv onMouseMove={hoverHandler} onTouchEnd={hoverHandler}>
      <img src={img} alt="" />
      <MonitorMiddle show={middleShow}>
        {pause ? <PauseIcon /> : <PlayArrowIcon />}
      </MonitorMiddle>
      <MonitorBackdrop
        hoverd={hoverd}
        onClick={hoverd ? pauseHandler : undefined}
      />
      <MonitorTitle hoverd={hoverd}>{monitorId + 1}번 카메라</MonitorTitle>
      <MonitorBottom hoverd={hoverd}>
        <input
          type="range"
          onChange={inputChangeHandler}
          onMouseUp={inputMouseUpHandler}
          onTouchEnd={inputMouseUpHandler}
          min={1}
          max={maxoffset - 3}
          step={1}
          value={movingOffset ? movingOffset : currentOffset.current}
        />
        <div>
          <PauseButton color="primary" onClick={pauseHandler}>
            {pause ? <PlayArrowIcon /> : <PauseIcon />}
          </PauseButton>
          <RealTimeButton
            variant="contained"
            onClick={realTimeHandler}
            realtime={currentOffset.current >= maxoffset - 2}
          >
            <CircleIcon />
            실시간
          </RealTimeButton>
          {time}
        </div>
      </MonitorBottom>
    </MonitorDiv>
  );
}

export default Monitor;

const MonitorDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 100%;

  overflow: hidden;

  input {
    width: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

const MonitorTitle = styled.div<{ hoverd: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
  padding: 0.2rem;

  z-index: 2;

  transition: 1s ease all;

  transform: ${props => {
    if (props.hoverd) {
      return 'translate(0, 0)';
    } else {
      return 'translate(0, -5rem)';
    }
  }};

  background-color: #00000098;
  border-radius: 0.5rem;

  color: white;
  font-size: 1.5rem;
`;

const MonitorBottom = styled.div<{ hoverd: boolean }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: fit-content;
  bottom: 0;
  left: 0;

  z-index: 2;

  background-color: #00000098;

  transition: 1s ease all;

  transform: ${props => {
    if (props.hoverd) {
      return 'translate(0, 0)';
    } else {
      return 'translate(0, 5rem)';
    }
  }};

  color: white;
`;

const PauseButton = styled(IconButton)`
  width: fit-content;
`;

const RealTimeButton = styled(Button)<{ realtime: boolean }>`
  font-size: 0.7rem;
  margin-right: 0.5rem;

  svg {
    font-size: 0.4rem;
    margin-right: 0.5rem;
    color: ${props =>
      props.realtime
        ? props.theme.palette.error.main
        : props.theme.palette.neutral.main};
  }
`;

const NocontentDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  font-size: 2rem;
`;

const logoContainer = css`
  width: 100%;
  height: 3rem;
  /* padding: 0px 10px; */
  /* margin-left: 10px; */
  margin: 10px 0px 30px 0px;
`;

const MonitorMiddle = styled.div<{ show: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.show ? 1 : 0)};

  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
  transition: all 1s ease;

  width: 4rem;
  height: 4rem;

  border-radius: 100%;

  background-color: #000000a6;

  color: white;
  font-size: 1.5rem;

  pointer-events: none;
`;

const MonitorBackdrop = styled.div<{ hoverd: boolean }>`
  display: ${props => (props.hoverd ? 'block' : 'none')};
  position: absolute;

  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  z-index: 1;

  background-color: rgba(0, 0, 0, 0.3);
`;
