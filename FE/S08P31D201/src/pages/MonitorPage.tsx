import useMWebsocket from '@/hooks/useMWebsocket';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'

function MonitorPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const sliderValueRef = useRef<HTMLDivElement>(null);
  const [img, setImg] = useState<string>();
  const [currentOffset, setCurrentOffset] = useState(0);

  const [img1, date1] = useMWebsocket(`ws://k8d201.p.ssafy.io:7005/ws/3`, currentOffset)

  useEffect(() => {
    axios({
      method:'get',
      url: 'http://k8d201.p.ssafy.io:7005/ws/max_offset/3'
    }).then(res => {
      console.log(res.data)
      setCurrentOffset(res.data)})
  }, [])

  // const buttonH = (e) => {
  //   console.log(e.target.value)
  //   setCurrentOffset(e.target.value)
  // }

  return (
    <div>MonitorPage
      {/* <input type="range" onChange={buttonH} min={0} max={100} step={1} /> */}
    </div>
  )
}

export default MonitorPage