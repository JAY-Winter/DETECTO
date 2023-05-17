// 시간 문자열 -> YYYY-MM-DD HH:MM:SS
export const timeFormatter = (time: string) => {
  const format = time.replace('T', ' ').slice(0, 19).split(' ');
  const date = format[0].split('-');
  const hangeulDate = date[0] + '년 ' + date[1] + '월 ' + date[2] + '일 - ';
  const times = format[1].split(':');
  const hangeulTimes = times[0] + '시 ' + times[1] + '분 ' + times[2] + '초';
  return hangeulDate + hangeulTimes;
};

// 문자열 배열 -> 문자열 간 쉼표 연결 (문자열, 문자열)
export const stringListFormatter = (stringItems: string[]) => {
  const items = [...stringItems];
  const sortedItems = items.sort().join(', ');
  return sortedItems;
};
