import useMWebsocket from '@/hooks/useMWebsocket';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';

function MonitorPage() {
  const [img, setImg] = useState<string>();
  const [currentOffset, setCurrentOffset] = useState(0);
  const ws = useRef<WebSocket>();

  // const [img1, date1] = useMWebsocket(`ws://k8d201.p.ssafy.io:7005/ws?cctvnumber=0&partition=129`, currentOffset)
  async function connectWebSocket() {
    if (ws.current) {
      ws.current.close();
      await new Promise(resolve => {
        if (ws.current) ws.current.onclose = resolve;
      });
    }

    const websocket = new WebSocket(
      `ws://k8d201.p.ssafy.io:7005/ws?cctvnumber=0&partition=129`
    );

    websocket.onmessage = async event => {
      const frameData = event.data;
      const data = JSON.parse(frameData);

      console.log(data);

      setImg('data:image/jpeg;base64,' + data['frame']);
      setCurrentOffset(data.offset)

      const timestamp = data.timestamp;
      var timestampDate = new Date(timestamp);
      var hours = timestampDate.getHours();
      var minutes = timestampDate.getMinutes();
      var seconds = timestampDate.getSeconds();
      var timestampString = hours + ':' + minutes + ':' + seconds;

      // sliderValue.innerText = timestampString;

      // slider.value = data.offset;

      websocket.send(JSON.stringify({ offset: currentOffset }));
      await new Promise(resolve => setTimeout(resolve, 10));
    };

    websocket.onclose = () => {
      console.log('close됨');
    };

    ws.current = websocket;
  }

  useEffect(() => {
    axios({
      method: 'get',
      url: 'https://k8d201.p.ssafy.io/ws/max_offset?cctvnumber=0&partition=129',
    }).then(res => {
      console.log(res.data);
      setCurrentOffset(res.data);
    });
    connectWebSocket();
    return () => {
      if (ws.current && ws.current.OPEN) {
        ws.current.close();
      }
    };
  }, []);

  const buttonH = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(ws.current);
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      connectWebSocket()
      ws.current.send(JSON.stringify({ offset: e.currentTarget.value }));
      
    } else {
      console.error("웹소켓이 열려있지 않습니다.");
    }
  };
  

  return (
    <div>
      MonitorPage
      <img src={img} alt="" />
      <input type="range" onChange={buttonH} min={0} max={100} step={1} value={currentOffset} />
    </div>
  );
}

export default MonitorPage;
