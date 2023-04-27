import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const height = 600;
const width = 800;
const margin = { top: 20, right: 20, bottom: 30, left: 60 };

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function ZoomChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const defs = svg.append('defs');

    const clip = defs
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width - margin.right)
      .attr('height', height);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('clip-path', 'url(#clip)');

    const AxisG = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    d3.csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv',
      function (d) {
        return {
          date: d3.timeParse('%Y-%m-%d')(d.date as string),
          value: d.value,
        };
      }
    ).then(function (data) {
      const x = d3
        .scaleTime()
        .domain(
          d3.extent(data, function (d) {
            console.log(d.date);
            return +(d.date as Date);
          }) as [number, number]
        )
        .range([0, width - margin.right - margin.left]).nice();

      const xAxis = AxisG.append('g')
        .attr(
          'transform',
          `translate(0, ${height - margin.bottom - margin.top})`
        )
        .call(d3.axisBottom(x).tickFormat((d: any) => {
          const date = new Date(d);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const day = date.getDate();
          return `${year}-${month}-${day}`;
        }));

      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +(d.value as string);
          }) as number,
        ])
        .range([height - margin.bottom - margin.top, 0]);

      const yAxis = AxisG.append('g').call(d3.axisLeft(y));

      const path = g
        .append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#5688c1')
        .attr('stroke-width', 2)
        .attr(
          'd',
          d3
            .line<d3.DSVRowString<string>>()
            .x(function (d) {
              return x(d.date as any);
            })
            .y(function (d) {
              return y(d.value as any);
            })
            .curve(d3.curveCardinal) as any
        );
      const zoomed = (event: any) => {
        const newX = event.transform.rescaleX(x);

        x.copy().domain(newX.domain());

        path.attr(
          'd',
          d3
            .line<d3.DSVRowString<string>>()
            .x(function (d) {
              return newX(d.date as any);
            })
            .y(function (d) {
              return y(d.value as any);
            })
            .curve(d3.curveCardinal) as any
        );

        xAxis.call(d3.axisBottom(newX).tickFormat((d: any) => {
          const date = new Date(d);
          const month = date.getMonth() + 1;
          const year = date.getFullYear();
          const day = date.getDate();
          return `${year}-${month}-${day}`;
        }));
      };

      const zoom = d3
        .zoom()
        .scaleExtent([1, 32])
        .extent([
          [0, 0],
          [
            width - margin.right - margin.left,
            height - margin.top - margin.bottom,
          ],
        ])
        .translateExtent([
          [
            x(new Date(data[0].date as Date)),
            y(d3.max(data, d => +(d.value as string)) as number),
          ],
          [x(new Date(data[data.length - 1].date as Date)), y(0)],
        ])
        .on('zoom', zoomed);

      svg.call(zoom as any);
    });
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default ZoomChart;
