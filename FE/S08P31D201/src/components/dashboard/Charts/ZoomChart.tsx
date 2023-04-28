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
      .attr('width', width)
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
      // X, Y 각 축을 지정

      // X 축은 시간을 기점으로 리니어하게 지정
      const xScale = d3
        .scaleUtc()
        .domain(
          d3.extent(data, function (d) {
            return +(d.date as Date);
          }) as [number, number]
        )
        .range([0, width - margin.right - margin.left]);

      // 축에 대한 그룹을 만들고 지정
      const xAxis = AxisG.append('g')
        .attr(
          'transform',
          `translate(0, ${height - margin.bottom - margin.top})`
        )
        // Date타입을 변경해서 x축에 지정
        .call(
          d3.axisBottom(xScale).tickFormat((d: any) => {
            const date = new Date(d);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const day = date.getDate();
            return `${year}-${month}-${day}`;
          })
        );

      // Y 축은 값(value)를 기점으로 리니어하게 지정
      const yScale = d3
        .scaleLinear()
        .domain([
          0,
          d3.max(data, function (d) {
            return +(d.value as string);
          }) as number,
        ])
        .range([height - margin.bottom - margin.top, 0]);

      // 축에 대한 그룹을 만들고 지정
      const yAxis = AxisG.append('g').call(d3.axisLeft(yScale));

      // 라인 그려주기
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

      // zoom / 줌 할 때마다 x축을 업데이트 해서 툴팁 위치 초기화 시켜주기
      const zoomed = (event: any) => {
        const newXScale = event.transform.rescaleX(xScale);

        console.log(newXScale);

        xScale.copy().domain(newXScale.domain());

        path.attr(
          'd',
          d3
            .line<d3.DSVRowString<string>>()
            .x(function (d) {
              return newXScale(d.date as any);
            })
            .y(function (d) {
              return yScale(d.value as any);
            })
            .curve(d3.curveCardinal) as any
        );

        xAxis.call(
          d3.axisBottom(newXScale).tickFormat((d: any) => {
            const date = new Date(d);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            const day = date.getDate();
            return `${year}-${month}-${day}`;
          })
        );

        function newpointermoved(event: any) {
          const X = d3.map(data, d => +(d.date as Date));
          const Y = d3.map(data, d => d.value);
          // 터치 포인트 지정하는 함수
          const i = d3.bisectCenter(X, newXScale.invert(d3.pointer(event)[0]));
          console.log(i);
        }

        svg.on('mousemove', newpointermoved);
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
      const tooltip = g.append('g').style('pointer-events', 'none');

      const X = d3.map(data, d => +(d.date as Date));
      const Y = d3.map(data, d => d.value);
      const O = d3.map(data, d => d);
      const I = d3.map(data, (_, i) => i);
      // 타이틀 지정
      let title: any;

      if (title === undefined) {
        const formatDate = xScale.tickFormat(null, '%b %-d, %Y');
        const formatValue = yScale.tickFormat(100);
        title = i => `${formatDate(X[i])}\n${formatValue(Y[i])}`;
      } else {
        const O = d3.map(data, d => d);
        const T = title;
        title = i => T(O[i], i, data);
      }
      // 마우스 포인트 움직임 함수
      function pointermoved(event: any) {
        // 터치 포인트 지정하는 함수
        const i = d3.bisectCenter(
          X,
          xScale.invert(d3.pointer(event)[0]) as any
        );

        tooltip.style("display", null);
        tooltip.attr("transform", `translate(${xScale(X[i])},${yScale(Y[i])})`);

        const tooltipPath = tooltip
          .selectAll('path')
          .data([,])
          .join('path')
          .attr('fill', 'white')
          .attr('stroke', 'black');

        const text = tooltip
          .selectAll('text')
          .data([,])
          .join('text')
          .call(text =>
            text
              .selectAll('tspan')
              .data(`${title(i)}`.split(/\n/))
              .join('tspan')
              .attr('x', 0)
              .attr('y', (_, i) => `${i * 1.1}em`)
              .attr('font-weight', (_, i) => (i ? null : 'bold'))
              .text(d => d)
          );

        const { x, y, width: w, height: h } = text.node().getBBox();
        console.log(x, y, w, h)
        text.attr('transform', `translate(${-w / 2},${15 - y})`);
        tooltipPath.attr(
          'd',
          `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
        );
        svg.property('value', O[i]).dispatch('input', { bubbles: true });
      }

      function pointerleft() {
        tooltip.style("display", "none");
        svg.node().value = null;
        svg.dispatch("input", {bubbles: true});
      }

      svg.on("pointerenter pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", event => event.preventDefault());
    });
  }, []);

  return <svg ref={svgRef}></svg>;
}

export default ZoomChart;
