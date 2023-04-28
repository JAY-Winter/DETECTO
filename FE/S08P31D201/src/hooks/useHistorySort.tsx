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

  useEffect(() => {
    setData(prev => {
      const clonedPrev = Array.from(prev);
      clonedPrev.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
      return clonedPrev;
    });
  }, []);

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
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
          } else {
            clonedPrev.sort((a, b) => {
              return new Date(b.date).getTime() - new Date(a.date).getTime();
            });
          }
          break;
        case 'Equipment':
          if (sortOrder === 'asc') {
            clonedPrev.sort((a, b) => {
              return a.issue.length - b.issue.length;
            });
          } else {
            clonedPrev.sort((a, b) => {
              return b.issue.length - a.issue.length;
            });
          }
          break;
        case 'Team':
          if (sortOrder === 'asc') {
            clonedPrev.sort((a, b) => {
              return a.team - b.team;
            });
          } else {
            clonedPrev.sort((a, b) => {
              return b.team - a.team;
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
