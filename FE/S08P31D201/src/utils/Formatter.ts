// 시간 문자열 -> YYYY-MM-DD HH:MM:SS
export const timeFormatter = (time: string) => {
  return time.replace('T', ' ').slice(0, 19);
};

// 문자열 배열 -> 문자열 간 쉼표 연결 (문자열, 문자열)
export const stringListFormatter = (stringItems: string[]) => {
  const items = [...stringItems];
  const sortedItems = items.sort().join(', ');
  return sortedItems;
};
