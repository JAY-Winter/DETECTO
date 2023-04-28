import { DashboardEqAtom } from '@/store/DashboardFilter';
import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import { useRecoilState } from 'recoil';

function SafetyEquipmentChip({ eqLabel }: { eqLabel: string }) {
  const [filterEq, setFilterEq] = useRecoilState(DashboardEqAtom);

  // 칩 클릭시 필터 값 변경
  const chipHandler = () => {
    if (filterEq.includes(eqLabel)) {
      setFilterEq(prev =>
        prev.filter(filterEq => {
          if (filterEq === eqLabel) {
            return false;
          }
          return true;
        })
      );
    } else {
      setFilterEq(prev => [...prev, eqLabel]);
    }
  };

  return (
    <EquipmentChip
      label={eqLabel}
      color="primary"
      variant={filterEq.includes(eqLabel) ? 'filled' : 'outlined'}
      onClick={chipHandler}
      clickable
    />
  );
}

export default SafetyEquipmentChip;

const EquipmentChip = styled(Chip)`
  font-size: 1rem;
  margin: 0 0 0.5rem 0.5rem;
`;
