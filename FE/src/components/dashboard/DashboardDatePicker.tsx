import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab, Box, Paper } from '@mui/material';
import { useRecoilState } from 'recoil';
import dayjs, { Dayjs } from 'dayjs';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { mobileV } from '@/utils/Mixin';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DashboardDayAtom from '@/store/DashboardFilter';

function DashboardDatePicker() {
  // 모바일 드롭다운 State
  const [mobileOpen, setMobileOpen] = useState(false);

  // MUI 탭 State
  const [tabValue, setTabValue] = useState<number>(0);

  // 날짜 지정 Recoil State
  const [date, setDate] = useRecoilState(DashboardDayAtom);

  // MUI 탭 onChange + 년도, 월로 바꿀때 값을 같이 바꿈
  const tabChange = (event: React.SyntheticEvent, newValue: number) => {
    switch (newValue) {
      case 1:
        setDate({
          startDay: dayjs().startOf('month').add(1, 'day'),
          endDay: dayjs().endOf('month'),
        });
        break;
      case 0:
        setDate({
          startDay: dayjs().startOf('year').add(1, 'day'),
          endDay: dayjs().endOf('year'),
        });
        break;
    }
    setTabValue(newValue);
  };

  const DateChangeHandler = (
    newValue: Dayjs | null,
    type: 'month' | 'year'
  ) => {
    if (newValue)
      switch (type) {
        case 'month':
          setDate({
            startDay: newValue?.startOf('month').add(1, 'day'),
            endDay: newValue?.endOf('month'),
          });
          break;
        case 'year':
          setDate({
            startDay: newValue?.startOf('year').add(1, 'day'),
            endDay: newValue?.endOf('year'),
          });
          break;
      }
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
          <span>기간 선택</span>
        </div>
      </DateHeaderDiv>
      {/* mobileopen props를 통해 모바일에서 드롭다운 표시 */}
      {/* 모바일이 아닐 경우 항상 표시 됨 */}
      <DateContentDiv mobileopen={mobileOpen}>
        <TabBox>
          <Tabs
            value={tabValue}
            onChange={tabChange}
            sx={{ marginBottom: '1.5rem' }}
          >
            <Tab label="연도 기준" value={0} />
            <Tab label="월 기준" value={1} />
          </Tabs>
          {/* 탭 패널 */}
          <div hidden={tabValue !== 0}>
            <TabPanelDiv>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label={'연도 선택'}
                  views={['year']}
                  value={date.startDay}
                  onChange={(newValue: Dayjs | null) =>
                    DateChangeHandler(newValue, 'year')
                  }
                />
              </LocalizationProvider>
            </TabPanelDiv>
          </div>
          <div hidden={tabValue !== 1}>
            <TabPanelDiv>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="월 선택"
                  views={['year', 'month']}
                  format={'YYYY-MM'}
                  value={date.startDay}
                  onChange={(newValue: Dayjs | null) =>
                    DateChangeHandler(newValue, 'month')
                  }
                />
              </LocalizationProvider>
            </TabPanelDiv>
          </div>
        </TabBox>
      </DateContentDiv>
    </DatePaper>
  );
}

export default DashboardDatePicker;

const DatePaper = styled(Paper)`
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 10px;
  width: calc(100% - 2rem);
  padding: 0.5rem 1.5rem 1.3rem 1.5rem;
  margin: 1rem;

  transition: 0.2s all ease;

  ${mobileV} {
    width: 100%;
    margin: 0;
    margin-bottom: 1rem;
  }
`;

const DateHeaderDiv = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    align-items: center;
    svg {
      display: none;
    }
    span {
      display: none;
    }
  }

  ${mobileV} {
    margin-top: 0.5rem;
    div {
      span {
        display: block;
        margin-left: 0.5rem;
      }
      svg {
        display: block;
      }
    }
    button {
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

const TabBox = styled(Box)`
  width: '100%';
  margin-bottom: '1rem';
`;

const TabPanelDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
