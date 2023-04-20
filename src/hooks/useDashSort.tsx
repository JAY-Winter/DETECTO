import { DashboardIssue } from '@/store/DashboardIssue';
import {
  DashboardSortField,
  DashboardSortOrder,
  TDashboardSortField,
  TDashboardSortOrder,
} from '@/store/DashboardSort';
import { useRecoilState } from 'recoil';

// 향후 수정 점 : 데이터 다시 sort해주는걸 어디로 빼야할까?
// 직접 받아오기 보다는 Recoil을 사용하는게 좋은가?
// 커스텀 훅 리턴타입 정확히 지정해야함

function useDashSort(): [
  TDashboardSortField,
  TDashboardSortOrder,
  (accessor: TDashboardSortField) => void
] {
  const [data, setData] = useRecoilState(DashboardIssue);

  const [sortField, setSortField] = useRecoilState(DashboardSortField);
  const [order, setOrder] = useRecoilState(DashboardSortOrder);

  const changeSortHandler = (accessor: TDashboardSortField) => {
    const sortOrder =
      accessor === sortField && order === 'asc' ? 'desc' : 'asc';
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

export default useDashSort;
