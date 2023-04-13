import React, { useEffect, useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Tabs, Tab, Box, Paper, css } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRecoilState } from 'recoil';
import { DashboardDayAtom } from '@/store/DashboardFilter';
import dayjs, { Dayjs } from 'dayjs';

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

function DashboardDatePicker() {
  const [tabValue, setTabValue] = useState<number>(0);

  const [date, setDate] = useRecoilState(DashboardDayAtom);

  const tabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <DatePaper>
      <TabBox>
        <Tabs value={tabValue} onChange={tabChange}>
          <Tab label="기간 선택" {...a11yProps(0)} />
          <Tab label="날짜 선택" {...a11yProps(1)} />
        </Tabs>
      </TabBox>
      <div hidden={tabValue !== 0}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="시작 날짜"
            format="YYYY.MM.DD"
            value={date.startDay}
            maxDate={date.endDay}
            onChange={(newValue: Dayjs | null) => {
              setDate(prev => {
                return { ...prev, startDay: newValue || dayjs() };
              });
            }}
            css={DatePickerCSS}
          />
          <DatePicker
            label="끝 날짜"
            format="YYYY.MM.DD"
            value={date.endDay}
            minDate={date.startDay}
            onChange={(newValue: Dayjs | null) => {
              setDate(prev => {
                return { ...prev, endDay: newValue || dayjs() };
              });
            }}
            css={DatePickerCSS}
          />
        </LocalizationProvider>
      </div>
      <div hidden={tabValue !== 1}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="날짜 선택"
            format="YYYY.MM.DD"
            value={date.startDay}
            onChange={(newValue: Dayjs | null) => {
              setDate({
                startDay: newValue || dayjs(),
                endDay: newValue || dayjs(),
              });
            }}
            css={DatePickerCSS}
          />
        </LocalizationProvider>
      </div>
    </DatePaper>
  );
}

export default DashboardDatePicker;

const DatePaper = styled(Paper)({
  width: '80vw',
  padding: '1rem',
  margin: '1rem',
});

const TabBox = styled(Box)({
  width: '100%',
  marginBottom: '1rem',
});

const DatePickerCSS = css`
  margin: 10px;
`;
