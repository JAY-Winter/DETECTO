import { HistoryEqAtom } from '@/store/HistoryFilter';
import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import { EquipmentType } from 'EquipmentTypes';
import { useRecoilState } from 'recoil';

const SafetyEquipmentChip = ({ eqLabel }: { eqLabel: EquipmentType }) => {
  const [filterEq, setFilterEq] = useRecoilState(HistoryEqAtom);

  // 칩 클릭시 필터 값 변경
  const chipHandler = () => {
    if (filterEq.includes(eqLabel.name)) {
      setFilterEq(prev =>
        prev.filter(filterEq => {
          if (filterEq === eqLabel.name) {
            return false;
          }
          return true;
        })
      );
    } else {
      setFilterEq(prev => [...prev, eqLabel.name]);
    }
  };

  return (
    <EquipmentChip
      label={eqLabel.description}
      color="primary"
      variant={filterEq.includes(eqLabel.name) ? 'filled' : 'outlined'}
      onClick={chipHandler}
      clickable
    />
  );
};

function EquipmentChips({equipments}: {equipments: EquipmentType[]}) {
  return (
    <>
      {equipments.map(equipment => {
        if (equipment.able)
        return (
          <SafetyEquipmentChip eqLabel={equipment} key={equipment.name} />
        );
      })}
    </>
  );
}

export default EquipmentChips;

const EquipmentChip = styled(Chip)`
  font-size: 1rem;
  margin: 0 0 0.5rem 0.5rem;
`;
