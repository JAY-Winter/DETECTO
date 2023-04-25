import { useState } from 'react';

import WordCloud, { Word } from '@components/summary/WordCloud';
import ScatterChart from '@components/summary/ScatterChart';
import MultiLineChart from '@components/summary/MultiLineChart';
import { Card } from '@mui/material';
import styled from '@emotion/styled';
import ZoomChart from '@components/summary/ZoomChart';

const myWords: Word[] = [
  { word: '안전모', size: 500 },
  { word: '장갑', size: 400 },
  { word: '앞치마', size: 300 },
  { word: '보안경', size: 200 },
  { word: '방진마스크', size: 10 },
];

function SummaryPage() {
  const [wordData, setWordData] = useState<Word[]>(myWords);

  return (
    <div>
      <h1>리포트(대시보드)페이지</h1>
      <SvgCard>
        <WordCloud words={wordData} width={500} height={500} />
      </SvgCard>
      <SvgCard>
        <ScatterChart />
      </SvgCard>
      <SvgCard>
        <MultiLineChart />
      </SvgCard>

      <ZoomChart />

      {/* <iframe width={500} height={500} src="http://192.168.100.55:5000/"></iframe> */}
    </div>
  );
}

export default SummaryPage;

const SvgCard = styled(Card)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 480px;
  height: 480px;
`;
