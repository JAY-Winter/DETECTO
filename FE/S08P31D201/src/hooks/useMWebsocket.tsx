import React, { useEffect, useState } from 'react';

function useMWebsocket(url: string, offsetValue: number) {
  const [ws, setWs] = useState<WebSocket>();

  const [imgUrl, setImgUrl] = useState<string>();
  const [imgDate, setImgDate] = useState<string>();

  const connectWebScoket = async () => {
    const newws = new WebSocket(url);

    newws.onopen = () => {
      console.log('Connect Success');
      if (ws) ws.send(JSON.stringify({ offset: offsetValue }));
    };
    newws.onmessage = async e => {
      const frameData = e.data;
      const data = JSON.parse(frameData);

      const img = new Image();

      img.src = 'data:image/jpeg;base64,' + data['frame'];

      setImgUrl(img.src);

      const timestamp = data.timestamp;
      const timestampDate = new Date(timestamp);
      const hours = timestampDate.getHours();
      const minutes = timestampDate.getMinutes();
      const seconds = timestampDate.getSeconds();
      const timestampString = hours + ':' + minutes + ':' + seconds;

      setImgDate(timestampString);
      console.log(data)
      if (ws) {
        ws.send(JSON.stringify({ offset: offsetValue }));
        await new Promise(resolve => setTimeout(resolve, 10));
      }
    };
    newws.onerror = error => {
      console.error('WebSocket error:', error);
    };

    newws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setWs(newws);
  };
  useEffect(() => {
    connectWebScoket();
  }, []);

  useEffect(() => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ offset: offsetValue }));
    }
  }, [offsetValue, ws]);

  return [imgUrl, imgDate];
}

export default useMWebsocket;
