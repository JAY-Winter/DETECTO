import EquipmentCard from '@components/equipmentManage/EquipmentCard';
import styled from '@emotion/styled';
import { AddCircleOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import ModalPortal from '@components/common/ModalPortal';
import CenterModal from '@components/common/CenterModal';
import EditEquipment from '@components/equipmentManage/EditEquipment';
import { mobileV } from '@/utils/Mixin';
import useEquipments from '@/hooks/useEquipments';
import useAxios from '@/hooks/useAxios';
import { RequestObj } from 'AxiosRequest';
import { EquipmentType } from 'EquipmentTypes';

function EquipmentManagePage() {
  const [isShowEditModal, setIsShowEditModal] = useState(false);
  const [equipments, setEquipments, fetchEquipments] = useEquipments();
  const [willEditEquipment, setWillEditEquipment] = useState<EquipmentType | null>(null);
  const [data, isLoading, setRequestObj] = useAxios({
    baseURL: 'https://k8d201.p.ssafy.io/api/',
  });

  // 장비 삭제 핸들러: 카드로부터 ID를 입력받아 삭제한다
  const deleteHandler = (willDeleteName: string) => {
    const requestObj: RequestObj = {
      url: `equipment/${willDeleteName}`,
      method: 'delete',
    };
    setRequestObj(requestObj);
  };

  // 장비 활성화 여부 토글링 핸들러: 카드로부터 장비명을 입력받아 토글링한다
  const toggleHandler = (willToggleType: number, willToggleName: string) => {
    let toggleEquipments = [];
    for (const equipment of equipments) {
      if (equipment.type === willToggleType) {
        if (equipment.name === willToggleName) {
          const toggleEquipment = {
            name: equipment.name,
            description: equipment.description,
            able: equipment.able ? 0 : 1,
          };
          toggleEquipments.push(toggleEquipment);
        } else {
          if (equipment.able === true) {
            const toggleEquipment = {
              name: equipment.name,
              description: equipment.description,
              able: equipment.able ? 0 : 1,
            };
            toggleEquipments.push(toggleEquipment);
          }
        }
      }
    }
    const requestObj: RequestObj = {
      url: 'equipment',
      method: 'put',
      body: toggleEquipments,
    };
    setRequestObj(requestObj);
  };

  // 편집 모달 핸들러
  const showModal = () => {
    setIsShowEditModal(!isShowEditModal);
  };

  const closeModalHandler = () => {
    setIsShowEditModal(false);
  };

  useEffect(() => {
    if (isLoading === false && data !== null) {
      fetchEquipments();
    }
  }, [data, isLoading]);

  return (
    <>
      {isShowEditModal && (
        <ModalPortal>
          <CenterModal onClose={closeModalHandler}>
            <EditEquipment
              equipment={willEditEquipment}
              fetchEquipments={fetchEquipments}
              onClose={closeModalHandler}
              setWillEditEquipment={setWillEditEquipment}
            />
          </CenterModal>
        </ModalPortal>
      )}
      <EquipmentManageDiv>
        <h1>보호구 관리</h1>
        <EquipmentCardDiv>
          {equipments.map(equipment => (
            <EquipmentCard
              key={equipment.name}
              equipment={equipment}
              fetchEquipments={fetchEquipments}
              onDelete={deleteHandler}
              onToggleActiveness={toggleHandler}
              setIsShowEditModal={setIsShowEditModal}
              setWillEditEquipment={setWillEditEquipment}
            />
          ))}
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
  /* align-items: center; */
  padding: 2.5rem 2rem;
  ${mobileV} {
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
  width: 100%;
  height: 100%;
  min-height: 400px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${props => props.theme.palette.neutral.section};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${props => props.theme.palette.neutral.card};
  }
`;
