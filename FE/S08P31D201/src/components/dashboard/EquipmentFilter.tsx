import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Paper } from '@mui/material';
import { RestartAlt } from '@mui/icons-material';
import SafetyEquipmentChip from './Equipment/SafetyEquipmentChip';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { mobileV } from '@/utils/Mixin';

import { DashboardEqAtom } from '@/store/DashboardFilter';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { EquipmentsAtom } from '@/store/EquipmentStore';

// const eq = ['안전모', '장갑', '앞치마', '보안경', '방진마스크'];

function DashboardEquipmentFilter() {
  const equipments = useRecoilValue(EquipmentsAtom);

  const setFilterEq = useSetRecoilState(DashboardEqAtom);

  // 모바일 드롭다운 State
  const [mobileOpen, setMobileOpen] = useState(false);

  // 장비 칩 map 랜더링 함수 (향후 랜더링 부분 추출 예정)
  const EquipmentChips = equipments.map(equipment => {
    return <SafetyEquipmentChip eqLabel={equipment.name} key={equipment.id} />;
  });

  const resetFilterEq = () => {
    setFilterEq([]);
  };

  return (
    <FilterPaper>
      {/* 모바일에서 클릭 시 드롭다운 open/close */}
      <FilterHeaderDiv
        onClick={() => {
          setMobileOpen(prev => !prev);
        }}
      >
        <div>
          {mobileOpen ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
          보호구 선택
        </div>
        <Button
          onClick={e => {
            e.stopPropagation();
            resetFilterEq();
          }}
        >
          <span>초기화</span>
          <RestartAlt color="primary" />
        </Button>
      </FilterHeaderDiv>
      {/* mobileopen props를 통해 모바일에서 드롭다운 표시 */}
      {/* 모바일이 아닐 경우 항상 표시 됨 */}
      <FilterContentDiv mobileopen={mobileOpen}>
        {EquipmentChips}
      </FilterContentDiv>
    </FilterPaper>
  );
}

export default DashboardEquipmentFilter;

const FilterPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  margin: 0.5rem;
`;

const FilterHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    svg {
      display: none;
    }
  }
  /* 모바일 한정 svg, 초기화 span */
  ${mobileV} {
    margin-bottom: 0;
    div {
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

const FilterContentDiv = styled.div<{ mobileopen: boolean }>`
  display: flex;

  /* 모바일 한정 컨텐츠 표시 */
  ${mobileV} {
    display: ${props => (props.mobileopen ? 'block' : 'none')};
  }
`;
