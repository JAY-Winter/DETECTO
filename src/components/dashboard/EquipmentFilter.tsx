import React from 'react';
import styled from '@emotion/styled';
import { Button, Chip, Paper } from '@mui/material';
import { RestartAlt } from '@mui/icons-material';
import SafetyEquipmentChip from './Equipment/SafetyEquipmentChip';

const eq = ['안전모', '장갑', '앞치마', '보안경', '방진마스크'];

function DashboardEquipmentFilter() {
  const EquipmentChips = eq.map(equipment => {
    return <SafetyEquipmentChip eqLabel={equipment} />;
  });

  return (
    <>
      <FilterPaper>
        <HeaderDiv>
          <h3>보호구 선택</h3>
          <Button>
            초기화
            <RestartAlt color="primary" />
          </Button>
        </HeaderDiv>
        <div>{EquipmentChips}</div>
      </FilterPaper>
    </>
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

const HeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 1rem;
`;

const ResetDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.theme.palette.grey[10]}
  }
`