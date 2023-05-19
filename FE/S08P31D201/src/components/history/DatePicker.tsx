import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Tabs, Tab, Box, Paper, css } from '@mui/material';
import { useRecoilState } from 'recoil';
import { HistoryDayAtom } from '@/store/HistoryFilter';
import dayjs from 'dayjs';
import {
  RestartAlt,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from '@mui/icons-material';
import { mobileV } from '@/utils/Mixin';
import HistoryDatepicker from './Date/HistoryDatepicker';

function HistoryDatePicker() {
  // 모바일 드롭다운 State
  const [mobileOpen, setMobileOpen] = useState(false);

  // MUI 탭 State
  const [tabValue, setTabValue] = useState<number>(0);

  // 날짜 지정 Recoil State
  const [date, setDate] = useRecoilState(HistoryDayAtom);

  // MUI 탭 onChange
  const tabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const resetFilterDay = () => {
    setDate({ startDay: dayjs(), endDay: dayjs() });
  };

  return (
    <DatePaper elevation={1}>
      {/* 모바일에서 클릭 시 드롭다운 open/close */}
      <DateHeaderDiv
        onClick={() => {
          setMobileOpen(prev => !prev);
        }}
      >
        <div>
          {mobileOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          날짜 선택
        </div>
        <Button
          onClick={e => {
            e.stopPropagation();
            resetFilterDay();
          }}
        >
          <span>현재 날짜</span>
          <RestartAlt color="primary" />
        </Button>
      </DateHeaderDiv>
      {/* mobileopen props를 통해 모바일에서 드롭다운 표시 */}
      {/* 모바일이 아닐 경우 항상 표시 됨 */}
      <DateContentDiv mobileopen={mobileOpen}>
        <HistoryDatepicker datetypes={[['startDay'], ['endDay']]} />
      </DateContentDiv>
    </DatePaper>
  );
}

export default HistoryDatePicker;

const DatePaper = styled(Paper)`
  width: 60%;
  padding: 1.3rem 1.5rem;
  margin-right: 1rem;
  transition: 0.2s all ease;
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 10px;

  ${mobileV} {
    width: 100%;
    margin-right: 0;
    margin-bottom: 0.5rem;
  }
`;

const DateHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    font-weight: 500;
    svg {
      display: none;
    }
  }

  button {
    padding: 0;
  }

  ${mobileV} {
    margin-bottom: 0;
    div {
      svg {
        display: block;
      }
    }
    button {
      display: flex;
      justify-content: flex-end;
      span {
        display: none;
      }
    }
  }
`;

const DateContentDiv = styled.div<{ mobileopen: boolean }>`
  display: flex;

  ${mobileV} {
    display: ${props => (props.mobileopen ? 'block' : 'none')};
  }
`;
