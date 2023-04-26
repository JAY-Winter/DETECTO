import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 20, right: 20, bottom: 30, left: 30 };
const height = 600;
const width = 800;

function ZoomChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default ZoomChart;
