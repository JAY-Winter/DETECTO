import { HistoryIssue } from '@/store/HistoryIssue';
import {
  HistorySortField,
  HistorySortOrder,
  THistorySortField,
  THistorySortOrder,
} from '@/store/HistorySort';
import { useEffect } from 'react';
import { useSetRecoilState, useRecoilState } from 'recoil';

// 향후 수정 점 : 데이터 다시 sort해주는걸 어디로 빼야할까?
// 직접 받아오기 보다는 Recoil을 사용하는게 좋은가?
// 커스텀 훅 리턴타입 정확히 지정해야함

function useHistorySort(): [
  THistorySortField,
  THistorySortOrder,
  (accessor: THistorySortField) => void
] {
  const setData = useSetRecoilState(HistoryIssue);

  const [sortField, setSortField] = useRecoilState(HistorySortField);
  const [order, setOrder] = useRecoilState(HistorySortOrder);

  const changeSortHandler = (accessor: THistorySortField) => {
    const sortOrder =
      accessor === sortField && order === 'desc' ? 'asc' : 'desc';
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting({ accessor, sortOrder });
  };

  const handleSorting = ({
    accessor,
    sortOrder,
  }: {
    accessor: string;
    sortOrder: string;
  }) => {
    setData(prev => {
      const clonedPrev = Array.from(prev);
      switch (accessor) {
        case 'Date':
          if (sortOrder === 'asc') {
            clonedPrev.sort((a, b) => {
              return new Date(a.time).getTime() - new Date(b.time).getTime();
            });
          } else {
            clonedPrev.sort((a, b) => {
              return new Date(b.time).getTime() - new Date(a.time).getTime();
            });
          }
          break;
        case 'Equipment':
          if (sortOrder === 'asc') {
            clonedPrev.sort((a, b) => {
              return a.reportItems.length - b.reportItems.length;
            });
          } else {
            clonedPrev.sort((a, b) => {
              return b.reportItems.length - a.reportItems.length;
            });
          }
          break;
        case 'Team':
          if (sortOrder === 'asc') {
            clonedPrev.sort((a, b) => {
              return a.team.id - b.team.id;
            });
          } else {
            clonedPrev.sort((a, b) => {
              return b.team.id - a.team.id;
            });
          }
          break;
      }
      return clonedPrev;
    });
  };
  return [sortField, order, changeSortHandler];
}

export default useHistorySort;
