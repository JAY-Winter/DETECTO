import { useState } from 'react';

import WordCloud, { Word } from '@components/summary/WordCloud';
import ScatterChart from '@components/summary/ScatterChart';

const myWords: Word[] = [{word: "안전모", size: 100}, {word: "장갑", size: 120}, {word: "앞치마", size: 20}, {word: "보안경", size: 60}, {word: "방진마스크", size: 1000} ]

const changeMyWords: Word[] = [{word: "안전모", size: 500}, {word: "장갑", size: 400}, {word: "앞치마", size: 300}, {word: "보안경", size: 200}, {word: "방진마스크", size: 10} ]

function SummaryPage() {
  const [wordData, setWordData] = useState<Word[]>(myWords)

  const changeData = () => {
    setWordData(changeMyWords)
  }

  return (
    <div>
      <h1>리포트(대시보드)페이지</h1>
      <WordCloud words={wordData} width={500} height={500}/>
      <button onClick={changeData}>바꾸기</button>
      <ScatterChart />
    </div>
  );
}

export default SummaryPage;
