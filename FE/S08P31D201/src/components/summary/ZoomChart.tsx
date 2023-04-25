import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 10, right: 10, bottom: 10, left: 10 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const data = {
  nodes: [
    { id: 1, x: 100, y: 50 },
    { id: 2, x: 50, y: 100 },
    { id: 3, x: 150, y: 100 },
  ],
  links: [
    { source: 1, target: 2 },
    { source: 1, target: 3 },
  ],
};

function ZoomChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg.append('g');

    const handleZoom = (e: any) => g.attr('transform', e.transform);

    const zoom = d3.zoom().on('zoom', handleZoom);

    svg.call(zoom as any);

    const links = data.links.map(l => {
      const source = data.nodes.find(n => n.id === l.source);
      const target = data.nodes.find(n => n.id === l.target);
      return { source, target };
    });

    g.selectAll('line.link')
      .data(links, d => {
        console.log(d)
        return `${d.source.id}-${d.target.id}`})
      .enter()
      .append('line')
      .classed('link', true)
      .attr('x1', d => d.source.x)
      .attr('x2', d => d.target.x)
      .attr('y1', d => d.source.y)
      .attr('y2', d => d.target.y)
      .style('stroke', 'black');

    const nodes = g
      .selectAll('g.node')
      .data(data.nodes, d => d.id)
      .enter()
      .append('g')
      .classed('node', true)
      .attr('transform', d => `translate(${d.x},${d.y})`);

    nodes.append('circle').attr('r', 10).style('fill', 'blue');
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default ZoomChart;
