import { keyframes } from '@emotion/react';
import { Button, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import CircleIcon from '@mui/icons-material/Circle';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';
import styled from '@emotion/styled';
import { tabletV } from '@/utils/Mixin';
import dayjs, { Dayjs } from 'dayjs';
import MonitorLoding from './MonitorLoding';

function Monitor({ monitorId, date }: { monitorId: number, date: Dayjs }) {
  const [img, setImg] = useState<string>();
  const currentOffset = useRef<number>(1);
  const ws = useRef<WebSocket>();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [maxoffset, setMaxOffset] = useState<number>(2);
  const [pause, setPause] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');

  const [hoverd, setHoverd] = useState<boolean>(false);

  async function connectWebSocket(date: number) {
    if (ws.current) {
      ws.current.close();
      await new Promise(resolve => {
        if (ws.current) ws.current.onclose = resolve;
      });
    }
    console.log(`wss://k8d201.p.ssafy.io/fast?cctvnumber=${monitorId}&partition=${date}`)
    const websocket = new WebSocket(
      `wss://k8d201.p.ssafy.io/fast?cctvnumber=${monitorId}&partition=${date}`
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

      // console.log(data)

      const timestamp = data.timestamp;
      var timestampDate = new Date(timestamp);
      var hours = timestampDate.getHours();
      var minutes = timestampDate.getMinutes();
      var seconds = timestampDate.getSeconds();
      var timestampString = hours + ':' + minutes + ':' + seconds;
      setTime(timestampString);

      // if (timeoutId.current) {
      //   clearTimeout(timeoutId.current);
      // }

      // timeoutId.current = setTimeout(() => {
      //   if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      //     ws.current.send(JSON.stringify({ offset: currentOffset.current }));
      //   }
      // }, 100);
    };

    websocket.onclose = () => {
      console.log('close됨');
    };

    websocket.onopen = () => {
      console.log('WebSocket connection established.');
      // websocket.send(JSON.stringify({ offset: currentOffset.current }));
    };

    websocket.onerror = event => {
      console.error('WebSocket error observed:', event);
    };

    ws.current = websocket;
  }

  useEffect(() => {
    if(ws.current) ws.current.close()
    axios({
      method: 'get',
      url: `https://k8d201.p.ssafy.io/fast/max_offset?cctvnumber=${monitorId}&partition=${date.diff(dayjs(date).startOf('year'), 'day')}`,
    }).then(res => {
      console.log(res.data);
      setMaxOffset(res.data.offsets);
      if (res.data.offsets !== 0) {
        connectWebSocket(date.diff(dayjs(date).startOf('year'), 'day'));
      }
    });
    return () => {
      if (ws.current && ws.current.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  const buttonH = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOffset = Number(e.currentTarget.value);

    currentOffset.current = newOffset;
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      setPause(false);
      ws.current.send(JSON.stringify({ offset: currentOffset.current - 1 }));
    } else {
      console.error('웹소켓이 열려있지 않습니다.');
    }
  };

  const pauseHandler = () => {
    setPause(prev => {
      
      return !prev;
    });
  };

  const hoverHandler = () => {
    setHoverd(true);
  };

  const mouseLeaveHandler = () => {
    setHoverd(false);
  };

  const realTimeHandler = () => {
    if (ws.current) {
      ws.current.send(JSON.stringify({ offset: maxoffset - 10 }));
    }
  };

  if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
    return (
      <MonitorLoding />
    );
  }
  return (
    <MonitorDiv onMouseEnter={hoverHandler} onMouseLeave={mouseLeaveHandler}>
      <img src={img} alt="" />
      <MonitorTitle hoverd={hoverd}>{monitorId}번 카메라</MonitorTitle>
      <MonitorBottom hoverd={hoverd}>
        <input
          type="range"
          onChange={buttonH}
          min={0}
          max={maxoffset - 3}
          step={1}
          value={currentOffset.current - 1}
        />
        <div>
          <PauseButton color="primary" onClick={pauseHandler}>
            {pause ? <PlayArrowIcon /> : <PauseIcon />}
          </PauseButton>
          <RealTimeButton variant="contained" onClick={realTimeHandler}>
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

  overflow: hidden;

  input {
    width: 100%;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const MonitorTitle = styled.div<{ hoverd: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
  padding: 0.2rem;

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

const RealTimeButton = styled(Button)`
  font-size: 0.7rem;

  svg {
    font-size: 0.4rem;
    margin-right: 0.5rem;
    color: ${props => props.theme.palette.error.main};
  }
`;