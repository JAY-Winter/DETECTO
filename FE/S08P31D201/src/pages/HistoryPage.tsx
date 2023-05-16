import { mobileV } from '@/utils/Mixin';
import HistoryDatePicker from '@components/history/DatePicker';
import HistoryEquipmentFilter from '@components/history/EquipmentFilter';
import HistoryObjection from '@components/history/HistoryObjection';
import HistorySafetyIssue from '@components/history/SafetyIssue';
import HistorySummary from '@components/history/Summary';
import styled from '@emotion/styled';
import axios from 'axios';
import { useEffect, useState } from 'react';

function HistoryPage() {
  const tablist = ['전체 목록', '인원 미지정', '이의 제기'];

  const [tabState, setTabState] = useState<number>(0);

  const listChangeHandler = (idx: number) => {
    setTabState(idx);
  };

  return (
    <HistoryDiv>
      <HistoryTitle>히스토리</HistoryTitle>
      <HistoryTabDiv>
        <HistoryTabul>
          {tablist.map((tab, idx) => (
            <HistoryTabli
              key={tab + idx}
              istab={tabState === idx}
              onClick={() => listChangeHandler(idx)}
            >
              {tab}
            </HistoryTabli>
          ))}
        </HistoryTabul>
      </HistoryTabDiv>
      {tabState === 0 ? (
        <>
          <HistorySummary />
          <HistoryFilterWrapper>
            <HistoryDatePicker />
            <HistoryEquipmentFilter />
          </HistoryFilterWrapper>
          <HistorySafetyIssue pageElNum={5} tabState={0} />
        </>
      ) : tabState === 1 ? (
        <>
          <HistorySafetyIssue pageElNum={10} tabState={1} />
        </>
      ) : (
        <HistoryObjection />
      )}
    </HistoryDiv>
  );
}

export default HistoryPage;

const HistoryTabDiv = styled.div`
  width: 100%;
`;

const HistoryTabul = styled.ul`
  display: flex;
  flex-direction: row;
`;

const HistoryTabli = styled.li<{ istab: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: calc(100% / 3);

  height: 3rem;
  width: 100%;

  border-top: ${props => `1px solid ${props.theme.palette.primary.main}`};
  border-left: ${props => `1px solid ${props.theme.palette.primary.main}`};
  border-right: ${props => `1px solid ${props.theme.palette.primary.main}`};
  border-radius: 1rem 1rem 0 0;

  background-color: ${props =>
    props.istab
      ? props.theme.palette.neutral.main
      : props.theme.palette.primary.main};
  color: ${props =>
    props.istab
      ? props.theme.palette.neutral.opposite
      : props.theme.palette.primary.contrastText};

  transition: 0.3s ease all;

  list-style: none;
`;

const HistoryTitle = styled.div`
  width: 100%;
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 1.5rem;
`;

const HistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  ${mobileV} {
    align-items: normal;
  }
`;

const HistoryFilterWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 1rem 0;

  ${mobileV} {
    flex-direction: column;
  }
`;
