import React, { useEffect, useRef, useState } from 'react';

function CCTVPage() {
  const canvasRef = useRef(null);
  const bufferingCanvasRef = useRef(null);
  const sliderRef = useRef(null);
  const sliderValueRef = useRef(null);
  const [img, setImg] = useState();
  let websocket;
  let currentOffset = 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const bufferingCanvas = bufferingCanvasRef.current;
    const bufferingContext = bufferingCanvas.getContext('2d');

    function drawBuffering() {
      bufferingContext.clearRect(
        0,
        0,
        bufferingCanvas.width,
        bufferingCanvas.height
      );
      bufferingContext.beginPath();
      bufferingContext.arc(
        bufferingCanvas.width / 2,
        bufferingCanvas.height / 2,
        20,
        0,
        2 * Math.PI
      );
      bufferingContext.stroke();
    }

    async function connectWebSocket(offset) {
      if (websocket) {
        websocket.close();
        await new Promise(resolve => (websocket.onclose = resolve));
      }

      websocket = new WebSocket(`ws://k8d201.p.ssafy.io:7005/ws/3`);
      console.log(websocket);
      websocket.onmessage = async event => {
        const frameData = event.data;
        const img = new Image();
        img.onload = () => {
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(img, 0, 0);
          bufferingCanvas.style.display = 'none';
          setImg(img.src);
        };
        img.src = 'data:image/jpeg;base64,' + frameData;

        websocket.send(JSON.stringify({ offset: currentOffset }));
        await new Promise(resolve => setTimeout(resolve, 10));
      };

      websocket.onopen = () => {
        console.log('WebSocket connection established.');
        websocket.send(JSON.stringify({ offset: offset }));
      };

      websocket.onerror = event => {
        console.error('WebSocket error observed:', event);
      };
    }

    connectWebSocket(currentOffset);

    const slider = sliderRef.current;
    const sliderValue = sliderValueRef.current;

    slider.addEventListener('input', async () => {
      console.log('input');
      const position = (slider.value / 40000) * canvas.width;
      context.clearRect(0, canvas.height - 20, canvas.width, 20);
      context.fillRect(0, canvas.height - 20, position, 20);
      sliderValue.innerText = slider.value;

      currentOffset = Math.floor(slider.value);
      websocket.send(JSON.stringify({ offset: currentOffset }));
    });

    slider.addEventListener('change', async () => {
      console.log('change');
      currentOffset = Math.floor(slider.value);
      websocket.send(JSON.stringify({ offset: currentOffset }));
    });

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  return (
    <div className="App">
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
        <canvas
          ref={bufferingCanvasRef}
          id="buffering"
          width="640"
          height="480"
          style={{ display: 'none', position: 'absolute', top: 0, left: 0 }}
        ></canvas>
      </div>
      <input
        ref={sliderRef}
        type="range"
        id="slider"
        min="0"
        max="40000"
        value="0"
      />
      <div ref={sliderValueRef} id="sliderValue"></div>
      <div style={{width: 600, height: 600}}>
        <img src={img}></img>
      </div>
    </div>
  );
}

export default CCTVPage;
