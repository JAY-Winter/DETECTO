import React, { useEffect, useRef, useState } from 'react';

function CCTVPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderValueRef = useRef<HTMLDivElement>(null);
  const [img, setImg] = useState<string>();
  const [currentOffset, setCurrentOffset] = useState(0);
  let websocket: WebSocket | undefined;
  let totalOffset

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    async function connectWebSocket(offset: number) {
      if (websocket) {
        websocket.close();
        await new Promise(resolve => {
          if (websocket) websocket.onclose = resolve;
        });
      }

      websocket = new WebSocket(`ws://k8d201.p.ssafy.io:7005/ws/3`);
      websocket.onmessage = async event => {
        const frameData = event.data;
        const data = JSON.parse(frameData);

        const img = new Image();

        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0);
          setImg(img.src);
        };
        img.src = 'data:image/jpeg;base64,' + data['frame'];
        totalOffset = data.total;
        slider.max = data.total;

        const timestamp = data.timestamp;
        const timestampDate = new Date(timestamp);
        const hours = timestampDate.getHours();
        const minutes = timestampDate.getMinutes();
        const seconds = timestampDate.getSeconds();
        const timestampString = hours + ':' + minutes + ':' + seconds;

        sliderValue.innerText = timestampString;

        if (websocket)
          websocket.send(JSON.stringify({ offset: currentOffset }));
        await new Promise(resolve => setTimeout(resolve, 10));
      };

      websocket.onopen = () => {
        console.log('WebSocket connection established.');
        if (websocket) websocket.send(JSON.stringify({ offset: offset }));
      };

      websocket.onerror = event => {
        console.error('WebSocket error observed:', event);
      };
    }

    connectWebSocket(currentOffset);

    const slider = sliderRef.current as HTMLInputElement;
    const sliderValue = sliderValueRef.current as HTMLDivElement;

    slider.addEventListener('input', async () => {
      const position = (currentOffset / 40000) * canvas.width;
      context.clearRect(0, canvas.height - 20, canvas.width, 20);
      context.fillRect(0, canvas.height - 20, position, 20);
      sliderValue.innerText = slider.value;

      setCurrentOffset(Math.floor(Number(slider.value)));
      if (websocket) websocket.send(JSON.stringify({ offset: currentOffset }));
    });

    slider.addEventListener('change', async () => {
      console.log('change');
      setCurrentOffset(Math.floor(Number(slider.value)));
      if (websocket) websocket.send(JSON.stringify({ offset: currentOffset }));
    });

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  return (
    <>
      <div
        id="canvas-container"
        style={{
          position: 'relative',
          width: '640px',
          height: '480px',
          display: 'inline-block',
        }}
      >
        <canvas
          ref={canvasRef}
          id="canvas"
          width="640"
          height="480"
          style={{
            border: '1px solid black',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        ></canvas>
      </div>
      <input
        ref={sliderRef}
        type="range"
        id="slider"
        min="0"
        max="40000"
        defaultValue={currentOffset}
      />
      <div ref={sliderValueRef} id="sliderValue"></div>
      <div style={{ width: 600, height: 600 }}>
        <img src={img}></img>
      </div>
    </>
  );
}

export default CCTVPage;
