import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

function MultiLineChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    d3.csv(
      'https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv'
    ).then(function (data) {
      // group the data: I want to draw one line per group

      const sumstat = d3.group(data, d => d.name); // nest function allows to group the calculation per level of a factor

      // Add X axis --> it is a date format
      const x = d3
        .scaleLinear()
        .domain(
          d3.extent(data, function (d) {
            return +d.year!;
          }) as [number, number]
        )
        .range([0, width]);
      const gx = g
        .append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x).ticks(5));

      // Add Y axis
      const y = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +d.n!;
          }) as number,
        ])
        .range([height, 0]);
      g.append('g').call(d3.axisLeft(y));

      // color palette
      const color = d3
        .scaleOrdinal()
        .range([
          '#e41a1c',
          '#377eb8',
          '#4daf4a',
          '#984ea3',
          '#ff7f00',
          '#ffff33',
          '#a65628',
          '#f781bf',
          '#999999',
        ]);

      // Draw the line
      const line = g
        .selectAll('.line')
        .data(sumstat)
        .join('path')
        .attr('fill', 'none')
        .attr('stroke', function (d) {
          return color(d[0] as string) as string;
        })
        .attr('stroke-width', 1.5)
        // .attr('d', function (d) {
        //   return d3
        //     .line<d3.DSVRowString<string>>()
        //     .x(d => {
        //       return x(+(d.year as string));
        //     })
        //     .y(d => {
        //       return y(+(d.n as string));
        //     })(d[1]);
        // });

      const xAxis = (g, x) =>
        g.call(
          d3
            .axisBottom(x)
            .ticks(width / 80)
            .tickSizeOuter(0)
        );

      const nline = (data, x) => {
        console.log(x)
          return d3
            .line<d3.DSVRowString<string>>()
            .x(d => {
              return x(+(d.year as string));
            })
            .y(d => {
              return y(+(d.n as string));
            })(data[1]) as string;
      };

      function zoomed(event) {
        const xz = event.transform.rescaleX(x);
        console.log(g)
        line.attr('d', nline(data, xz));
        gx.call(xAxis, xz);
      }

      const zoom = d3
        .zoom()
        .scaleExtent([1, 32])
        .extent([
          [margin.left, 0],
          [width - margin.right, height],
        ])
        .translateExtent([
          [margin.left, -Infinity],
          [width - margin.right, Infinity],
        ])
        .on('zoom', zoomed);

      svg
        .call(zoom as any)
        .transition()
        .duration(750)
        .call(zoom.scaleTo as any, 4, [x(Date.UTC(2001, 8, 1)), 0]);
    });
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default MultiLineChart;
