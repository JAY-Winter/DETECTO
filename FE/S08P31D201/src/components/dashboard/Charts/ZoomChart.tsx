import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const height = 600;
const width = 800;
const margin = { top: 20, right: 20, bottom: 30, left: 60 };

function ZoomChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const defs = svg.append('defs');

    defs
      .append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', width - margin.right - margin.left)
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
      const xScale = d3
        .scaleUtc()
        .domain(
          d3.extent(data, function (d) {
            return +(d.date as Date);
          }) as [number, number]
        )
        .range([0, width - margin.right - margin.left])
        .nice();

      const xAxis = AxisG.append('g')
        .attr(
          'transform',
          `translate(0, ${height - margin.bottom - margin.top})`
        )
        .call(
          d3.axisBottom(xScale).tickFormat((d: any) => {
            const date = new Date(d);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const day = date.getDate();
            return `${year}-${month}-${day}`;
          })
        );

      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +(d.value as string);
          }) as number,
        ])
        .range([height - margin.bottom - margin.top, 0]);

      const yAxis = AxisG.append('g').call(d3.axisLeft(yScale));

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
              return xScale(d.date as any);
            })
            .y(function (d) {
              return yScale(d.value as any);
            })
            .curve(d3.curveCardinal) as any
        );

      // zoom
      const zoomed = (event: any) => {
        const newX = event.transform.rescaleX(xScale);

        xScale.copy().domain(newX.domain());

        path.attr(
          'd',
          d3
            .line<d3.DSVRowString<string>>()
            .x(function (d) {
              return newX(d.date as any);
            })
            .y(function (d) {
              return yScale(d.value as any);
            })
            .curve(d3.curveCardinal) as any
        );

        xAxis.call(
          d3.axisBottom(newX).tickFormat((d: any) => {
            const date = new Date(d);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const day = date.getDate();
            return `${year}-${month}-${day}`;
          })
        );
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
            xScale(new Date(data[0].date as Date)),
            yScale(d3.max(data, d => +(d.value as string)) as number),
          ],
          [xScale(new Date(data[data.length - 1].date as Date)), yScale(0)],
        ])
        .on('zoom', zoomed);

      svg.call(zoom as any);

      // tooltip

      // 툴팁 추가
      // const tooltip = svg.append("g")
      // .style("pointer-events", "none");

      // // 타이틀 지정
      // let title: any

      // if (title === undefined) {
      //   const formatDate = xScale.tickFormat(null, "%b %-d, %Y");
      //   const formatValue = yScale.tickFormat(100, yFormat);
      //   title = i => `${formatDate(X[i])}\n${formatValue(Y[i])}`;
      // } else {
      //   const O = d3.map(data, d => d);
      //   const T = title;
      //   title = i => T(O[i], i, data);
      // }

      // // 마우스 포인트 움직임 함수
      
      // function pointermoved(event: any) {
      //   console.log('마우스 움직입니다')
      //   const X = d3.map(data, d => +(d.date as Date))
      //   const Y = d3.map(data, d => d.value)
      //   // 터치 포인트 지정하는 함수
      //   const i = d3.bisectCenter(X, xScale.invert(d3.pointer(event)[0]));
      //   tooltip.style("display", null);
      //   tooltip.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);
    
      //   const path = tooltip.selectAll("path")
      //     .data([,])
      //     .join("path")
      //       .attr("fill", "white")
      //       .attr("stroke", "black");
    
      //   const text = tooltip.selectAll("text")
      //     .data([,])
      //     .join("text")
      //     .call(text => text
      //       .selectAll("tspan")
      //       // .data(`${title(i)}`.split(/\n/))
      //       .join("tspan")
      //         .attr("x", 0)
      //         .attr("y", (_, i) => `${i * 1.1}em`)
      //         .attr("font-weight", (_, i) => i ? null : "bold")
      //         .text(d => d));
    
      //   const {x, y, width: w, height: h} = text.node().getBBox();
      //   text.attr("transform", `translate(${-w / 2},${15 - y})`);
      //   path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
      //   svg.property("value", O[i]).dispatch("input", {bubbles: true});
      // }

      // // 포인터 아웃 함수
      // function pointerleft() {
      //   tooltip.style("display", "none");
      //   svg.node().value = null;
      //   svg.dispatch("input", {bubbles: true});
      // }

      // svg.on("mousemove", pointermoved)
      // .on("mouseleave", pointerleft)
      // .on("touchstart", event => event.preventDefault());
      
    });
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default ZoomChart;
