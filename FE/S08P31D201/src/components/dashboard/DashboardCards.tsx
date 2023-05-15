import { mobileV, tabletV } from '@/utils/Mixin';
import styled from '@emotion/styled';
import { Card } from '@mui/material';
import { CountItemData, CountTimeTeamData } from 'ChartTypes';
import React, { useEffect, useState } from 'react';

function HistoryCards({
  eqData,
  teamData,
}: {
  eqData: CountItemData[] | undefined;
  teamData: CountTimeTeamData[] | undefined;
}) {
  const [topEq, setTopEq] = useState<string>();
  const [topTeam, setTopTeam] = useState<string>();

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
    } else {
      setTopEq(undefined);
    }
  }, [eqData]);

  useEffect(() => {
    if (teamData) {
      const highestValueKey = teamData.reduce(
        (
          maxItem: {
            teamName: any;
            value: any;
          },
          currentItem: {
            teamName: any;
            value: any;
          }
        ) => {
          return currentItem.value.length > maxItem.value.length
            ? currentItem
            : maxItem;
        }
      ).teamName;

      setTopTeam(highestValueKey);
    } else {
      setTopTeam(undefined);
    }
  }, [teamData]);

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
          <div>{topTeam}</div>
        </div>
        <div className="content-sub">
          <h1>{topTeam}</h1>
          <h4>위반 팀 1위</h4>
        </div>
      </HistoryCard>
    </HistoryCardDiv>
  );
}

export default HistoryCards;

const HistoryCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
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
  margin: 1rem;

  flex-basis: calc(50% - 2rem);

  ${tabletV} {
    flex-basis: 100%;
  }

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
      height: 10rem;
      width: 10rem;
      border-radius: 100%;
      background: ${props =>
        `linear-gradient(to bottom right, ${
          props.theme.palette[props.linearcolor].light
        }, ${props.theme.palette[props.linearcolor].main})`};

      font-size: 1.5rem;

      ${mobileV} {
        height: 7rem;
      width: 7rem;
      }
    }
  }

  .content-sub {
    width: 100%;
    text-align: center;
    font-size: 1rem;
  }
`;
