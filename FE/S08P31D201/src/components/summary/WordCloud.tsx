import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as cloud from 'd3-cloud';
import styled from '@emotion/styled';

export interface Word {
  word: string;
  size: number;
}

interface Props {
  words: Word[];
  width: number;
  height: number;
}

const myWords: Word[] = [
  { word: '안전모', size: 100 },
  { word: '장갑', size: 120 },
  { word: '앞치마', size: 20 },
  { word: '보안경', size: 60 },
  { word: '방진마스크', size: 1000 },
];

const maxFontSize = 80;
const minFontSize = 10;

const WordCloud: React.FC<Props> = ({ words, width, height }) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current);
    const layout = cloud()
      .size([width, height])
      .words(
        words.map(d => ({
          text: d.word,
          size:
            minFontSize +
            ((maxFontSize - minFontSize) *
              (d.size - Math.min(...words.map(w => w.size)))) /
              (Math.max(...words.map(w => w.size)) -
                Math.min(...words.map(w => w.size))),
        }))
      )
      .padding(5)
      .rotate(() => ~~(Math.random() * 2) * 90)
      .fontSize(d => (d.size && d.size < 80 ? (d.size as number) : 80))
      .on('end', (words: cloud.Word[]) => {
        svg
          .append('g')
          .attr('transform', `translate(${width / 2}, ${height / 2})`)
          .selectAll('text')
          .data(words)
          .join('text')
          .style('font-size', d => `${d.size}px`)
          .style('fill', '#034ea2')
          .attr('text-anchor', 'middle')
          .style('font-family', 'Impact')
          .attr(
            'transform',
            d => `translate(${d.x}, ${d.y})rotate(${d.rotate})`
          )
          .text(d => d.text as string);
      });

    layout.start();
  }, [words, width, height]);

  return (
    <WordCloudSVG ref={svgRef} width={width} height={height}>
      <g />
    </WordCloudSVG>
  );
};

export default WordCloud;

const WordCloudSVG = styled.svg`
  text {
    transition: font-size 0.5s ease-out;
  }
`;
