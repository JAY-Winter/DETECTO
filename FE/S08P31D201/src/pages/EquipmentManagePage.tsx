import EquipmentCard from '@components/equipmentManage/EquipmentCard';
import styled from '@emotion/styled';
import { AddCircleOutline } from '@mui/icons-material';
import { useState } from 'react';
import ModalPortal from '@components/common/ModalPortal';
import CenterModal from '@components/common/CenterModal';
import EditEquipment from '@components/equipmentManage/EditEquipment';
import { mobileV } from '@/utils/Mixin';
import useEquipments from '@/hooks/useEquipments';

function EquipmentManagePage() {
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [equipments, fetchEquipments] = useEquipments();

  // 장비 삭제 핸들러: 카드로부터 ID를 입력받아 삭제한다
  const deleteHandler = (willDeleteName: string) => {
    const decision = confirm("삭제하시겠습니까??");
    if (decision) {
      // setEquipments((oldState) => {
      //   return oldState.filter(item => item.name !== willDeleteName);
      // })
    }
  }

  // 장비 활성화 여부 토글링 핸들러: 카드로부터 장비명을 입력받아 토글링한다
  const toggleHandler = (willDeleteName: string) => {
    // setEquipments((oldState) => {
    //   const newState = oldState.map(item => {
    //     const newItem = {...item};
    //     if (newItem.name === willDeleteName) {
    //       newItem.able = !newItem.able;
    //     }
    //     return newItem;
    //   })
    //   return newState;
    // })
  }
  
  // 편집 모달 핸들러
  const showModal = () => {
    setIsShowEditModal(!isShowEditModal);
  }

  const closeModalHandler = () => {
    setIsShowEditModal(false);
  }

  return (
    <>
      { isShowEditModal &&
      <ModalPortal>
        <CenterModal onClose={closeModalHandler}>
          <EditEquipment fetchEquipments={fetchEquipments} onClose={closeModalHandler}/>
        </CenterModal>
      </ModalPortal>
      }
      {/* <pre>
        {JSON.stringify(equipments, null, 2)}
      </pre> */}
      <EquipmentManageDiv>
        <h1>보호구 관리</h1>
        <EquipmentCardDiv>
          {equipments.map(equipment => <EquipmentCard key={equipment.name} equipment={equipment} onDelete={deleteHandler} onToggleActiveness={toggleHandler} />)}
          <EquipmentAddButton onClick={showModal}>
            <AddCircleOutline color="disabled" />
          </EquipmentAddButton>
        </EquipmentCardDiv>
      </EquipmentManageDiv>
    </>
  );
}

export default EquipmentManagePage;

const EquipmentManageDiv = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 2rem;
  ${ mobileV } {
    align-items: normal;
  }
`;

const EquipmentCardDiv = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 22rem), 1fr));
  column-gap: 30px;
  row-gap: 30px;
  margin-top: 1.5rem;
`;

const EquipmentAddButton = styled.button`
  width: 22rem;
  height: 100%;
  min-height: 400px;
  border: none;
  cursor: pointer;
  background-color: ${props => props.theme.palette.neutral.card};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => props.theme.palette.neutral.cardHover};
  }
`