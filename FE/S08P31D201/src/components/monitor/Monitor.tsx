import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Button, IconButton } from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Monitor({ monitorId }: { monitorId: number }) {
  const [img, setImg] = useState<string>();
  const currentOffset = useRef<number>(0);
  const ws = useRef<WebSocket>();
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const [maxoffset, setMaxOffset] = useState<number>();
  const [pause, setPause] = useState<boolean>(false)

  async function connectWebSocket(offset: number) {
    if (ws.current) {
      ws.current.close();
      await new Promise(resolve => {
        if (ws.current) ws.current.onclose = resolve;
      });
    }

    const websocket = new WebSocket(
      `wss://k8d201.p.ssafy.io:7005/wss?cctvnumber=${monitorId}&partition=129`
    );

    // const websocket = new WebSocket(
    //   `ws://k8d201.p.ssafy.io:7005/wss?cctvnumber=${monitorId}&partition=129`
    // );

    websocket.onmessage = async event => {
      const frameData = event.data;
      const data = JSON.parse(frameData);

      setImg('data:image/jpeg;base64,' + data['frame']);
      currentOffset.current = data.offset;

      const timestamp = data.timestamp;
      var timestampDate = new Date(timestamp);
      var hours = timestampDate.getHours();
      var minutes = timestampDate.getMinutes();
      var seconds = timestampDate.getSeconds();
      var timestampString = hours + ':' + minutes + ':' + seconds;

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify({ offset: currentOffset.current }));
        }
      }, 100);
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
    axios({
      method: 'get',
      url: `https://k8d201.p.ssafy.io/wss/max_offset?cctvnumber=${monitorId}&partition=129`,
    }).then(res => {
      setMaxOffset(res.data.offsets);
    });
    connectWebSocket(currentOffset.current);
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
      setPause(false)
      ws.current.send(JSON.stringify({ offset: currentOffset.current - 1 }));
    } else {
      console.error('웹소켓이 열려있지 않습니다.');
    }
  };

  if (ws.current && ws.current.readyState !== WebSocket.OPEN) {
    return <div>로딩중입니당...</div>;
  }

  const pauseHandler = () => {
    setPause(prev => {
      if (prev) {
        if (ws.current)
        ws.current.send(JSON.stringify({ offset: currentOffset.current - 1 }));
      } else {
        if (timeoutId.current) {
          clearTimeout(timeoutId.current);
        }
      }
      return !prev
    })
  }

  return (
    <MonitorDiv>
      <img src={img} alt="" />
      <PauseButton color='primary' onClick={pauseHandler}>{pause ? <PlayArrowIcon /> : <PauseIcon />}</PauseButton>
      <input
        type="range"
        onChange={buttonH}
        min={0}
        max={maxoffset}
        step={1}
        value={currentOffset.current - 1}
      />
    </MonitorDiv>
  );
}

export default Monitor;

const MonitorDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

  width: 50%;

  input {
    position: absolute;
    bottom: 0;
    right: 0;
    width: calc(100% - 4rem);
    margin: 1rem;
  }

  img {
    width: 100%;
  }
`;

const PauseButton = styled(IconButton)`
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 0.2rem
`;
