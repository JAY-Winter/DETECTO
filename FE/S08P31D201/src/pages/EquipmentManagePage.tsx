import EquipmentCard from '@components/equipmentManage/EquipmentCard';
import styled from '@emotion/styled';
import { AddCircleOutline } from '@mui/icons-material';
import { EquipmentType } from 'EquipmentTypes';
import { useRecoilState } from 'recoil';
import { EquipmentsAtom } from '@/store/EquipmentStore';
import { getRandomNumber } from '@/utils/RandomDataGenerator';
import { useState } from 'react';
import ModalPortal from '@components/common/ModalPortal';
import CenterModal from '@components/common/CenterModal';
import EditEquipment from '@components/equipmentManage/EditEquipment';
import { mobileV } from '@/utils/Mixin';

function EquipmentManagePage() {
  const [equipments, setEquipment] = useRecoilState(EquipmentsAtom);
  const [isShowEditModal, setIsShowEditModal] = useState(false);

  // 장비 삭제 핸들러: 카드로부터 ID를 입력받아 삭제한다
  const deleteHandler = (willDeleteID: number) => {
    const decision = confirm("삭제하시겠습니까??");
    if (decision) {
      setEquipment((oldState) => {
        return oldState.filter(item => item.id !== willDeleteID);
      })
    }
  }

  // 장비 활성화 여부 토글링 핸들러: 카드로부터 ID를 입력받아 토글링한다
  const toggleHandler = (willToggleID: number) => {
    setEquipment((oldState) => {
      const newState = oldState.map(item => {
        const newItem = {...item};
        if (newItem.id === willToggleID) {
          newItem.isActive = !newItem.isActive;
        }
        return newItem;
      })
      return newState;
    })
  }
  
  const showModal = () => {
    setIsShowEditModal(!isShowEditModal);
  }

  const closeModalHandler = () => {
    setIsShowEditModal(false);
  }

  const addItemHandler = (name: string, desc: string, img: string) => {
    const newItem: EquipmentType = {
      id: getRandomNumber(1, 10000000),
      name: name,
      desc: desc,
      img: img,
      isActive: true
    }

    setEquipment((oldState) => {
      return [...oldState, newItem];
    })
  }

  return (
    <>
      { isShowEditModal &&
      <ModalPortal>
        <CenterModal onClose={closeModalHandler}>
          <EditEquipment addItemHandler={addItemHandler} onClose={closeModalHandler}/>
        </CenterModal>
      </ModalPortal>
      }
      <EquipmentManageDiv>
        <h1>보호구 관리</h1>
        <EquipmentCardDiv>
          {equipments.map(equipment => <EquipmentCard key={equipment.id} equipment={equipment} onDelete={deleteHandler} onToggleActiveness={toggleHandler} />)}
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