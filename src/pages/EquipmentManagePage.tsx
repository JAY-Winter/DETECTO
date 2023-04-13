import EquipmentCard from '@components/equipmentManage/EquipmentCard';
import styled from '@emotion/styled';
import React from 'react';

function EquipmentManagePage() {
  return (
    <EquipmentDiv>
      <h1>보호구 관리</h1>
      <EquipmentCard />
    </EquipmentDiv>
  );
}

export default EquipmentManagePage;

const EquipmentDiv = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  
  align-items: center;

  margin: 1rem;
`