import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { rgb } from 'd3-color';
import useResize from '@/hooks/useResize';
import { CoordinationItemData } from 'ChartTypes';
import { Button } from '@mui/material';
import axios from 'axios';
import { transform } from 'lodash';

const margin = { top: 10, right: 10, bottom: 10, left: 10 };

function IssueMap({
  data,
}: {
  data: { id: number; area: number; x: number; y: number } | undefined;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const mainDiv = useRef(null);
  const size = useResize(mainDiv);
  const [coordinate, setCoordinate] = useState({ x: -10, y: -10 });

  useEffect(() => {
    if (data) setCoordinate({ x: data.x, y: data.y });
  }, []);

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();
    if (data) {
      const svg = d3.select(svgRef.current);

      const { width } = size;
      const mapWidth = width - margin.right - margin.left;
      const height = mapWidth * 0.65;

      svg
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const defs = svg.append('defs');

      // g바깥으로 나가는 요소들은 안보이게 처리
      defs
        .append('clipPath')
        .attr('id', `clip`)
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width - margin.right)
        .attr('height', height + margin.top);

      svg.attr('clip-path', 'url(#clip)');

      // Add X axis
      const x = d3.scaleLinear().domain([0, 100]).range([0, mapWidth]);

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 85]).range([height, 0]);

      // Create x-axis line
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', mapWidth)
        .attr('y2', 0)
        .attr('stroke', 'currentColor');

      g.append('line')
        .attr('x1', mapWidth / 2)
        .attr('y1', height)
        .attr('x2', mapWidth)
        .attr('y2', height)
        .attr('stroke', 'currentColor');

      g.append('line')
        .attr('x1', 0)
        .attr('y1', height / 2)
        .attr('x2', mapWidth)
        .attr('y2', height / 2)
        .attr('stroke', 'currentColor');

      // Create y-axis line

      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', height / 2)
        .attr('stroke', 'currentColor');

      g.append('line')
        .attr('x1', mapWidth)
        .attr('y1', 0)
        .attr('x2', mapWidth)
        .attr('y2', height)
        .attr('stroke', 'currentColor');

      g.append('line')
        .attr('x1', mapWidth / 2)
        .attr('y1', 0)
        .attr('x2', mapWidth / 2)
        .attr('y2', height)
        .attr('stroke', 'currentColor');

      const cctv1: d3.Arc<any, d3.DefaultArcObject> = d3
        .arc()
        .innerRadius(0)
        .outerRadius(30)
        .startAngle(Math.PI)
        .endAngle(Math.PI / 2);

      const cctv2: d3.Arc<any, d3.DefaultArcObject> = d3
        .arc()
        .innerRadius(0)
        .outerRadius(30)
        .startAngle(Math.PI * 2)
        .endAngle((Math.PI * 3) / 2);

      const cctv3: d3.Arc<any, d3.DefaultArcObject> = d3
        .arc()
        .innerRadius(0)
        .outerRadius(30)
        .startAngle(Math.PI * 2)
        .endAngle((Math.PI * 3) / 2);

      // Create CCTV Circle
      g.append('path')
        .attr('d', cctv1 as any)
        .style('fill', data.area === 1 ? 'red' : 'currentColor')
        .attr('transform', `translate(${mapWidth / 2},0)`);

      g.append('path')
        .attr('d', cctv2 as any)
        .style('fill', data.area === 2 ? 'red' : 'currentColor')
        .attr('transform', `translate(${mapWidth / 2}, ${height / 2})`);
      g.append('path')
        .attr('d', cctv3 as any)
        .style('fill', data.area === 3 ? 'red' : 'currentColor')
        .attr('transform', `translate(${mapWidth}, ${height})`);

      g.append('text')
        .attr('x', mapWidth / 2 + 10)
        .attr('y', 10)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'currentcolor')
        .style('filter', 'invert(1)')
        .text('1');
      g.append('text')
        .attr('x', mapWidth / 2 - 10)
        .attr('y', height / 2 - 10)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'currentcolor')
        .style('filter', 'invert(1)')
        .text('2');
      g.append('text')
        .attr('x', mapWidth - 10)
        .attr('y', height - 10)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'currentcolor')
        .style('filter', 'invert(1)')
        .text('3');

      // Add dots
      const redDot = g
        .append('g')
        // .selectAll('dot')
        // .data(data)
        // .enter()
        .append('circle')
        // .attr('class', function (d) {
        //   return 'dot ' + d.reportItem;
        // })
        .attr('cx', function (d) {
          return x(coordinate.x < 0 ? -10 : coordinate.x);
        })
        .attr('cy', function (d) {
          return y(coordinate.y < 0 ? -10 : coordinate.y);
        })
        .attr('r', 7)
        .style('fill', 'red');

      function dotMove(event: any) {
        const [mouseX, mouseY] = d3.pointer(event);
        const xValue = x.invert(mouseX);
        const yValue = y.invert(mouseY);
        redDot
          .attr('cx', function (d) {
            return x(xValue);
          })
          .attr('cy', function (d) {
            return y(yValue);
          });
      }

      function dotClick(event: any) {
        const [mouseX, mouseY] = d3.pointer(event);
        const xValue = x.invert(mouseX);
        const yValue = y.invert(mouseY);
        setCoordinate({ x: xValue, y: yValue });
      }

      const rect = g
        .append('rect')
        .attr('width', width / 2 - margin.left)
        .attr('height', height / 2 + margin.top)
        .attr('fill', 'transparent')
        .attr('clip-path', 'url(#clip)');

      if (data.area === 2) {
        rect.attr('x', 0).attr('y', 0);
      } else if (data.area === 1) {
        rect.attr('x', width / 2).attr('y', 0);
      } else {
        rect.attr('x', width / 2).attr('y', height / 2);
      }

      if (coordinate.x === -10 && coordinate.y === -10) {
        rect.on('pointermove', dotMove).on('click', dotClick);
      } else {
        rect.on('pointermove', null).on('click', dotClick);
      }
    }
  }, [size, data, coordinate]);

  console.log({
    id: -1,
    x: Math.ceil(coordinate.x),
    y: Math.ceil(coordinate.y),
  });
  const coordinateHandler = () => {
    if (data)
      axios({
        method: 'post',
        url: 'https://k8d201.p.ssafy.io/api/report/coord',
        data: {
          id: data.id,
          x: Math.ceil(coordinate.x),
          y: Math.ceil(coordinate.y),
        },
      });
  };

  return (
    <div ref={mainDiv}>
      <svg ref={svgRef}></svg>
      <Button
        variant="contained"
        sx={{ width: '100%' }}
        onClick={coordinateHandler}
      >
        위치 수정
      </Button>
    </div>
  );
}

export default IssueMap;
