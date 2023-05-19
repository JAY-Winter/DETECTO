import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useResize from '@/hooks/useResize';
import { CountTimeData } from 'ChartTypes';

// const width = 800;
const margin = { top: 60, right: 30, bottom: 60, left: 60 };

function ZoomChart({
  name,
  data,
  color,
}: {
  name: string;
  color?: string;
  data: CountTimeData[] | undefined;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useResize(rootRef);

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();
    // 차트 밑바탕 도화지 작업
    // svg를 지정
    const { width } = size;
    const height = Math.max(width * 0.5, 300);

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const defs = svg.append('defs');

    // g바깥으로 나가는 요소들은 안보이게 처리
    defs
      .append('clipPath')
      .attr('id', `clip${name}`)
      .append('rect')
      .attr('x', 0)
      .attr('y', -3)
      .attr('width', width - margin.right - margin.left + 2)
      .attr('height', height - margin.top - margin.bottom + 6);

    // fill graident
    const gradient = defs
      .append('linearGradient')
      .attr('id', `gradient${name}`)
      .attr('x1', '0%')
      .attr('y1', '100%')
      .attr('x2', '0%')
      .attr('y2', '0%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr(
        'style',
        `stop-color:${color ? color : '#5688c1'};stop-opacity:0.05`
      );

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('style', `stop-color:${color ? color : '#5688c1'};stop-opacity:.5`);

    // 축을 그리는 그룹 지정
    const AxisG = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    // 컨텐츠(라인)을 그리는 그룹 지정
    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('clip-path', `url(#clip${name})`);
    // 그룹 안에서 터치 이벤트를 담당하는 투명한 사각형
    g.append('rect')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom);

    const ClipPathG = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X, Y 각 축을 지정

    // X 축은 시간을 기점으로 리니어하게 지정
    if (data !== undefined) {
      const dates = data.map(d => d.date as Date);
      const [minDate, maxDate] = d3.extent(dates) as [Date, Date];

      let minXDate = minDate;
      let maxXDate = maxDate;

      // 데이터의 길이가 1인 경우에 대한 처리
      if (dates.length === 1) {
        minXDate = d3.timeDay.offset(minXDate, -1); // 최소값을 하루 이전으로 조정
        maxXDate = d3.timeDay.offset(maxXDate, 1); // 최대값을 하루 이후로 조정
      }

      const tickValues = d3.timeDay.range(
        minXDate as Date,
        maxXDate as Date,
        Math.ceil(
          (maxXDate.getTime() - minXDate.getTime()) / (1000 * 60 * 60 * 24) / 5
        )
      );

      const xScale = d3
        .scaleUtc()
        .domain([minXDate, maxXDate])
        .range([0, width - margin.right - margin.left + 1]);

      // 축에 대한 그룹을 만들고 지정
      const xAxis = AxisG.append('g')
        .attr(
          'transform',
          `translate(0, ${height - margin.bottom - margin.top})`
        )
        // Date타입을 변경해서 x축에 지정
        .call(
          d3
            .axisBottom(xScale)
            .tickFormat((d: any) => {
              const date = new Date(d);
              const month = date.getMonth() + 1;
              const year = date.getFullYear().toString().slice(2, 4);
              const day = date.getDate();
              return `${year}.${month}.${day}`;
            })
            .tickValues(tickValues)
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
      const line = (xScale: (value: d3.NumberValue) => number) =>
        d3
          .line<d3.DSVRowString<string>>()
          .x(function (d) {
            return xScale(d.date as any);
          })
          .y(function (d) {
            return yScale(d.value as any);
          }) as any;

      const circle = g
        .selectAll('circle')
        .data(data)
        .join('circle')
        .attr('cx', d => xScale(d.date as Date))
        .attr('cy', d => yScale(+(d.value as string)))
        .attr('r', 3)
        .attr('fill', color || '#5688c1');

      const path = g
        .append('path')
        .datum(data)
        .attr('stroke', `${color ? color : '#5688c1'}`)
        .attr('stroke-width', 2)
        .attr('d', line(xScale))
        .style('fill', 'none');

      // 아래쪽 채울 area 지정

      const area = (xScale: (value: d3.NumberValue) => number) =>
        d3
          .area<d3.DSVRowString<string>>()
          .x(function (d) {
            return xScale(d.date as any);
          })
          .y0(yScale(0))
          .y1(function (d) {
            return yScale(d.value as any);
          }) as any;

      const fillArea = g
        .append('path')
        .datum(data)
        .attr('fill', `url(#gradient${name})`)
        .attr('d', area(xScale));

      // zoom / 줌 할 때마다 x축을 업데이트 해서 툴팁 위치 초기화 시켜주기
      const zoomed = (event: any) => {
        // X 축에 대한 스케일을 다시 지정
        const newXScale = event.transform.rescaleX(xScale);
        // 도메인도 다시 지정
        xScale.copy().domain(newXScale.domain());

        const newTickValues = d3.timeDay.range(
          newXScale.domain()[0],
          newXScale.domain()[1],
          Math.ceil(
            (newXScale.domain()[1].getTime() -
              newXScale.domain()[0].getTime()) /
              (1000 * 60 * 60 * 24) /
              5
          )
        );

        // 라인 위치도 다시 지정
        path.attr('d', line(newXScale));

        circle.attr('cx', d => newXScale(d.date as Date));

        fillArea.attr('d', area(newXScale));

        // X축 g를 다시 지정
        xAxis.call(
          d3
            .axisBottom(newXScale)
            .tickFormat((d: any) => {
              const date = new Date(d);
              const month = date.getMonth() + 1;
              const year = date.getFullYear().toString().slice(2, 4);
              const day = date.getDate();
              return `${year}.${month}.${day}`;
            })
            .tickValues(newTickValues)
        );

        // 툴팁 함수 재지정
        g.on('pointerenter pointermove', e => pointermoved(e, newXScale));
      };

      // zoom함수 할당
      const zoom = d3
        .zoom()
        .scaleExtent([1, 30])
        .extent([
          [0, 0],
          [
            width - margin.right - margin.left,
            height - margin.top - margin.bottom,
          ],
        ])
        // 늘릴 수 있는 최대 지점 지정
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
      const tooltip = ClipPathG.append('g').style('pointer-events', 'none');

      const X = d3.map(data, d => +(d.date as Date));
      const Y = d3.map(data, d => d.value);
      const O = d3.map(data, d => d);
      const I = d3.map(data, (_, i) => i);
      // 타이틀 지정

      const formatDate = xScale.tickFormat(undefined, '%b %-d, %Y');
      const formatValue = yScale.tickFormat(100);
      const title = (i: number) => {
        const date = new Date(X[i]);
        date.setDate(date.getDate() + 1); // 날짜에 하루를 더함
        return `${formatDate(date)}\n${formatValue(+(Y[i] as string))}`;
      };
      const T = title;

      // 마우스 포인트 움직임 함수
      function pointermoved(event: any, xpoint: any) {
        if (data !== undefined) {
          const x = d3.pointer(event)[0];
          const i = d3.bisectCenter(
            data.map(d => d.date as Date),
            xpoint.invert(x) as Date
          );
          const d = data[i];
          const xPosition = xpoint(d.date as Date);
          const yPosition = yScale(+(d.value as string));

          tooltip.style('display', null);
          tooltip.attr('transform', `translate(${xPosition},${yPosition})`);

          const tooltipPath = tooltip
            .selectAll('path')
            .data([null])
            .join('path')
            .attr('fill', 'white')
            .attr('stroke', 'black');

          const tooltipCircle = tooltip
            .selectAll('circle')
            .data([null])
            .join('circle')
            .attr('r', '5')
            .attr('fill', `${color ? color : '#5688c1'}`)
            .attr('stroke', 'white');

          const text: any = tooltip
            .selectAll('text')
            .data([null])
            .join('text')
            .call(text => {
              return text
                .selectAll('tspan')
                .data(`${title(i)}`.split(/\n/))
                .join('tspan')
                .attr('x', 0)
                .attr('y', (_, i) => `${i * 1.1}em`)
                .attr('font-weight', (_, i) => (i ? null : 'bold'))
                .text(d => d);
            });

          const { x: tx, y, width: w, height: h } = text.node().getBBox();
          tooltipCircle.attr('transform', `translate(${0},${y + 15})`);
          text.attr('transform', `translate(${-w / 2},${15 - y})`);
          tooltipPath.attr(
            'd',
            `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
          );
          svg.property('value', O[i]).dispatch('input');
        }
      }

      function pointerleft() {
        tooltip.style('display', 'none');
        const svgNode = svg.node() as any;
        svgNode.values = null;
        svg.dispatch('input');
      }

      g.on('pointerenter pointermove', e => pointermoved(e, xScale))
        .on('pointerleave', pointerleft)
        .on('touchstart', event => event.preventDefault());
    }
  }, [size, data]);

  return (
    <div ref={rootRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default ZoomChart;
