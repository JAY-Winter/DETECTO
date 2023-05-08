import styled from '@emotion/styled';
import { Card } from '@mui/material';
import { CountItemData } from 'ChartTypes';
import React, { useEffect, useState } from 'react';

function HistoryCards({
  eqData,
}: {
  eqData: CountItemData[] | undefined
}) {
  const [topEq, setTopEq] = useState<string>();

  useEffect(() => {
    if (eqData) {
      const highestValueKey = eqData.reduce(
        (
          maxItem: {
            reportItem: string;
            count: number;
          },
          currentItem: {
            reportItem: string;
            count: number;
          }
        ) => {
          return currentItem.count > maxItem.count ? currentItem : maxItem;
        }
      ).reportItem;

      setTopEq(highestValueKey);
    }
  }, [eqData]);

  return (
    <HistoryCardDiv>
      <HistoryCard linearcolor="primary">
        <div className="content-main">
          <div>{topEq}</div>
        </div>
        <div className="content-sub">
          <h1>{topEq}</h1>
          <h4>위반 보호구 1위</h4>
        </div>
      </HistoryCard>
      <HistoryCard linearcolor="error">
        <div className="content-main">
          <div>1팀</div>
        </div>
        <div className="content-sub">
          <h1>1팀</h1>
          <h4>위반 팀 1위</h4>
        </div>
      </HistoryCard>
      <HistoryCard linearcolor="secondary">
        <div className="content-main">
          <div>+20%</div>
        </div>
        <div className="content-sub">
          <h1>이전달 대비 증가폭</h1>
        </div>
      </HistoryCard>
      <HistoryCard linearcolor="success">
        <div className="content-main">
          <div>통계치</div>
        </div>
        <div className="content-sub">
          <h1>통계수치</h1>
        </div>
      </HistoryCard>
    </HistoryCardDiv>
  );
}

export default HistoryCards;

const HistoryCardDiv = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  grid-template-rows: repeat(1, calc(20vh + 1rem));
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
  column-gap: 1rem;
  row-gap: 1rem;
`;

const HistoryCard = styled(Card)<{
  linearcolor: 'primary' | 'secondary' | 'error' | 'success';
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;

  position: relative;
  height: 20vh;
  width: 100%;

  padding: 1rem;

  color: ${props => props.theme.palette.primary.contrastText};

  border-radius: 1rem;
  background: ${props =>
    `linear-gradient(to bottom right, ${
      props.theme.palette[props.linearcolor].main
    }, ${props.theme.palette[props.linearcolor].light})`};
  transition: 0.2s all ease;

  .content-main {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-right: auto;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 150px;
      width: 150px;
      border-radius: 100%;
      background: ${props =>
        `linear-gradient(to bottom right, ${
          props.theme.palette[props.linearcolor].light
        }, ${props.theme.palette[props.linearcolor].main})`};

      font-size: 1.5rem;
    }
  }

  .content-sub {
    width: 100%;
    text-align: center;
    font-size: 1rem;
  }
`;
