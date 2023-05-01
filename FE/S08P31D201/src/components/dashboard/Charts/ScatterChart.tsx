import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import useResize from '@/hooks/useResize';

const margin = { top: 10, right: 10, bottom: 10, left: 10 };

function ScatterChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const mainDiv = useRef(null);
  const size = useResize(mainDiv);

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current);

    const { width } = size;
    const mapWidth = width * 0.7;
    const height = mapWidth * 0.65;

    d3.csv(
      'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/iris.csv'
    ).then(function (data) {
      svg
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom);
      const g = svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // Add X axis
      const x = d3.scaleLinear().domain([4, 8]).range([0, mapWidth]);
      // g.append('g')
      //   .attr('transform', `translate(0, ${height})`)
      //   .call(d3.axisBottom(x));

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 9]).range([height, 0]);
      // g.append('g').call(d3.axisLeft(y));

      // Create x-axis line
      g.append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', mapWidth)
        .attr('y2', 0)
        .attr('stroke', 'currentColor');

      g.append('line')
        .attr('x1', 0)
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
        .attr('y2', height)
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
        .startAngle(Math.PI)
        .endAngle((Math.PI * 3) / 2);

      const cctv3: d3.Arc<any, d3.DefaultArcObject> = d3
        .arc()
        .innerRadius(0)
        .outerRadius(30)
        .startAngle(0)
        .endAngle(Math.PI / 2);

      const cctv4: d3.Arc<any, d3.DefaultArcObject> = d3
        .arc()
        .innerRadius(0)
        .outerRadius(30)
        .startAngle(Math.PI * 2)
        .endAngle((Math.PI * 3) / 2);

      // Create CCTV Circle
      g.append('path')
        .attr('d', cctv1 as any)
        .style('fill', 'currentColor')
        .attr('transform', `translate(0,0)`);
      g.append('text')
        .attr('x', 10)
        .attr('y', 10)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'currentcolor')
        .style('filter', 'invert(1)')
        .text('1');

      g.append('path')
        .attr('d', cctv2 as any)
        .style('fill', 'currentColor')
        .attr('transform', `translate(${mapWidth}, 0)`);

      g.append('text')
        .attr('x', mapWidth - 10)
        .attr('y', 10)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'currentcolor')
        .style('filter', 'invert(1)')
        .text('2');

      g.append('path')
        .attr('d', cctv3 as any)
        .style('fill', 'currentColor')
        .attr('transform', `translate(0, ${height})`);
      g.append('text')
        .attr('x', 10)
        .attr('y', height - 10)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'currentcolor')
        .style('filter', 'invert(1)')
        .text('3');

      g.append('path')
        .attr('d', cctv4 as any)
        .style('fill', 'currentColor')
        .attr('transform', `translate(${mapWidth}, ${height})`);
      g.append('text')
        .attr('x', mapWidth - 10)
        .attr('y', height - 10)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .style('fill', 'currentcolor')
        .style('filter', 'invert(1)')
        .text('4');

      // Color scale: give me a specie name, I return a color
      const color = d3
        .scaleOrdinal()
        .domain(['setosa', 'versicolor', 'virginica'])
        .range(['#c500006b', '#0008f370', '#ffe6009c']);

      // Highlight the specie that is hovered
      const highlight = function (event: MouseEvent, d: any) {
        const selected_specie = d.Species;
        d3.selectAll('.dot')
          .transition()
          .duration(200)
          .style('fill', '#77777772')
          .attr('r', 3);

        d3.selectAll('.' + selected_specie)
          .transition()
          .duration(200)
          .style('fill', color(selected_specie) as string)
          .attr('r', 7);
      };

      // Highlight the specie that is hovered
      const doNotHighlight = function (
        event: MouseEvent,
        d: d3.DSVRowString<string>
      ) {
        d3.selectAll('.dot')
          .transition()
          .duration(200)
          .style('fill', function (d: any) {
            return color(d.Species) as string;
          })
          .attr('r', 5);
      };

      // Add dots
      g.append('g')
        .selectAll('dot')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', function (d) {
          return 'dot ' + d.Species;
        })
        .attr('cx', function (d) {
          return x(parseFloat(d.Sepal_Length as string));
        })
        .attr('cy', function (d) {
          return y(parseFloat(d.Petal_Length as string));
        })
        .attr('r', 5)
        .style('fill', function (d) {
          return color(d.Species as string) as string;
        })
        .on('mouseover', highlight)
        .on('mouseleave', doNotHighlight);
      // add marks

      const marksGroup = svg
        .selectAll('g.marks')
        .data([null])
        .attr('transform', `translate(${width * 0.75}, 10)`);

      const marksGroupEnter = marksGroup
        .enter()
        .append('g')
        .classed('mapmarks', true)
        .attr('transform', `translate(${width * 0.75}, 10)`);

      marksGroup.exit().remove();

      const marksUpdate = marksGroupEnter.merge(marksGroup as any);

      const groupedData = d3.group(
        data,
        d => d.Species
      );

      console.log(groupedData)

      const mark = marksUpdate
        .selectAll('g.mapmarks')
        .data(groupedData)
        .join(
          enter => {
            const g = enter.append('g').classed('mapmarks', true);
            g.append('rect')
              .attr('rx', 3)
              .attr('ry', 3)
              .attr('width', 20)
              .attr('height', 15);
            g.append('text')
              .attr('dx', 25)
              .attr('alignment-baseline', 'hanging');
            return g;
          },
          update => update,
          exit => exit.remove()
        )
        .attr('transform', (d, i) => `translate(0, ${i * 30})`)
        .style('fill', function (d) {
          console.log(d)
          return color(d[0] as string) as string;
        })
        .on('mouseenter', (e, d) => highlight(e, d[1][0]))
        .on('mouseleave', (e, d) => doNotHighlight(e, d[1][0]));;

        marksUpdate
          .selectAll('.mapmarks')
          .select('text')
          .text((d: any) => d[0]);

    });
  }, [size]);

  return (
    <div ref={mainDiv}>
      <svg ref={svgRef}>
        <g />
      </svg>
    </div>
  );
}

export default ScatterChart;
