import EquipmentCard from '@components/EquipmentManage/EquipmentCard';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';

function EquipmentManagePage() {
  return (
    <EquipmentDiv>
      <h1>보호구 관리</h1>
      <EquipmentCardDiv>
        <EquipmentCard />
        <EquipmentCard />
        <EquipmentCard />
        <EquipmentCard />
      </EquipmentCardDiv>
      <EquipmentAddButton variant="contained">
        <AddCircleOutline />
      </EquipmentAddButton>
      <hr />
    </EquipmentDiv>
  );
}

export default EquipmentManagePage;

const EquipmentDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  margin: 1rem;
`;

const EquipmentCardDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  width: 100%;
`;

const EquipmentAddButton = styled(Button)`
  width: 80%;

  margin-bottom: 1rem;
  svg {
    font-size: 3rem;
  }
`;
