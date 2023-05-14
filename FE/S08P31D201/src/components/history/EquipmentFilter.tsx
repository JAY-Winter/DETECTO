import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Button, Paper } from '@mui/material';
import { RestartAlt } from '@mui/icons-material';
import EquipmentChips from './Equipment/SafetyEquipmentChip';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

import { mobileV } from '@/utils/Mixin';

import { HistoryEqAtom } from '@/store/HistoryFilter';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { EquipmentsAtom } from '@/store/EquipmentStore';
import useEquipments from '@/hooks/useEquipments';

function HistoryEquipmentFilter() {
  const [equipments, setEquipments, fetchEquipments] = useEquipments();
  const setFilterEq = useSetRecoilState(HistoryEqAtom);

  // 모바일 드롭다운 State
  const [mobileOpen, setMobileOpen] = useState(false);

  const resetFilterEq = () => {
    setFilterEq([]);
  };

  return (
    <FilterPaper elevation={0}>
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
        {<EquipmentChips equipments={equipments} />}
      </FilterContentDiv>
    </FilterPaper>
  );
}

export default HistoryEquipmentFilter;

const FilterPaper = styled(Paper)`
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  width: 40%;
  padding: 1.3rem 1.5rem;
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 10px;

  ${mobileV} {
    width: 100%;
  }
`;

const FilterHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    font-weight: 500;
    svg {
      display: none;
    }
  }

  button {
    padding: 0;
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
      display: flex;
      justify-content: flex-end;
      span {
        display: none;
      }
    }
  }
`;

const FilterContentDiv = styled.div<{ mobileopen: boolean }>`
  display: flex;
  width: 100%;
  height: 4.5rem;
  flex-wrap: wrap;
  margin-top: 1rem;
  overflow: auto;

  /* 모바일 한정 컨텐츠 표시 */
  ${mobileV} {
    display: ${props => (props.mobileopen ? 'block' : 'none')};
  }
`;
