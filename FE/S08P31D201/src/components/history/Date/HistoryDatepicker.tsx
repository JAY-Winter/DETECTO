import React from 'react';
import { HistoryDayAtom } from '@/store/HistoryFilter';
import { css } from '@emotion/react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useRecoilState } from 'recoil';

type TdatepickerType = ["startDay"] | ["endDay"] | ["startDay", "endDay"];

function HistoryDatepicker({datetypes}: {datetypes: TdatepickerType[]}) {
  // 날짜 지정 Recoil State
  const [date, setDate] = useRecoilState(HistoryDayAtom);

  const DateChangeHandler = (newValue: Dayjs | null, DateType: TdatepickerType) => {
    setDate(prev => {
      if (DateType.length === 1) { // DateType가 ["startDay"] 또는 ["endDay"]일 경우
        const key = DateType[0]; // DateType의 첫 번째 요소를 key로 사용
        console.log(key)
        console.log({ ...prev})
        return { ...prev, [key]: newValue || dayjs() };
      } else { // DateType가 ["startDay", "endDay"]일 경우
        const [startKey, endKey] = DateType; // DateType의 첫 번째와 두 번째 요소를 각각 startKey와 endKey로 사용
        return { ...prev, [startKey]: newValue || dayjs(), [endKey]: newValue || dayjs() };
      }
    });
  }

  const DatePickers = datetypes.map((type) => {
    const labeltext = type.length === 2 ? "날짜 선택" : (type[0] === "startDay" ? "시작 날짜" : "끝 날짜")

    return <DatePicker
    label={labeltext}
    format="YYYY.MM.DD"
    value={date[type[0]]}
    maxDate={dayjs()}
    onChange={(newValue: Dayjs | null) => DateChangeHandler(newValue, type)}
    css={DatePickerCSS}
    key={labeltext}
  />
  })

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      {DatePickers}
    </LocalizationProvider>
  );
}

export default HistoryDatepicker;

const DatePickerCSS = css`
  margin: 10px;
`;
