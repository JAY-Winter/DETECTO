import { mobileV } from '@/utils/Mixin';
import HistoryDatePicker from '@components/history/DatePicker';
import HistoryEquipmentFilter from '@components/history/EquipmentFilter';
import HistoryObjection from '@components/history/HistoryObjection';
import HistorySafetyIssue from '@components/history/SafetyIssue';
import HistorySummary from '@components/history/Summary';
import styled from '@emotion/styled';
import { Button, ButtonGroup } from '@mui/material';
import { useState } from 'react';

function HistoryPage() {
  const tablist = ['전체 목록', '미지정 인원 목록', '이의 제기 목록'];

  const [tabState, setTabState] = useState<number>(0);

  const listChangeHandler = (idx: number) => {
    setTabState(idx);
  };

  return (
    <HistoryDiv>
      <HistoryTitle>
        <h1>
          위반 목록 <span>{'>'}</span>
        </h1>
        <HistoryTabDiv>
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            {tablist.map((tab, idx) => (
              <ButtonStyle
                key={tab + idx}
                istab={tabState === idx}
                onClick={() => listChangeHandler(idx)}
              >
                {tab}
              </ButtonStyle>
            ))}
          </ButtonGroup>
        </HistoryTabDiv>
      </HistoryTitle>
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

const HistoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  ${mobileV} {
    align-items: normal;
  }
`;

const HistoryTitle = styled.div`
  width: 100%;
  margin-bottom: 1.8rem;
  display: flex;

  h1 {
    min-width: fit-content;
    span {
      margin: 0 1rem 0 0.5rem;
      color: ${props => props.theme.palette.primary.main};
    }
  }

  ${mobileV} {
    flex-direction: column;
  }
`;

const HistoryTabDiv = styled.div`
  width: 100%;

  ${mobileV} {
    margin-top: 1rem;
    > div {
      width: 100%;
      display: flex;
    }
  }
`;

const ButtonStyle = styled(Button)<{ istab: boolean }>`
  word-break: keep-all;
  background-color: ${props =>
    props.istab
      ? props.theme.palette.primary.main
      : props.theme.palette.primary.contrastText};

  color: ${props =>
    props.istab
      ? props.theme.palette.primary.contrastText
      : props.theme.palette.primary.main};

  :hover {
    background-color: ${props => props.theme.palette.primary.main};
    color: ${props => props.theme.palette.primary.contrastText};
  }

  ${mobileV} {
    font-size: 0.8rem;
    flex-basis: 33%;
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
