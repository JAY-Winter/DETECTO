import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { LinearProgress, Switch, css } from '@mui/material';
import React from 'react';
import { EquipmentType } from 'EquipmentTypes';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditDropdown from './EditDropdown';
import { mobileV } from '@/utils/Mixin';
import useAxios from '@/hooks/useAxios';
import { RequestObj } from 'AxiosRequest';
import CloseIcon from '@mui/icons-material/Close';

type EquipmentCardProps = {
  equipment: EquipmentType;
  fetchEquipments: () => void;
  onDelete: (willDeleteName: string) => void;
  onToggleActiveness: (willToggleType: number, willToggleName: string) => void;
  setIsShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  setWillEditEquipment: React.Dispatch<
    React.SetStateAction<EquipmentType | null>
  >;
};

type progressDataType = {
  data: number;
};

function EquipmentCard({
  equipment,
  fetchEquipments,
  onDelete,
  onToggleActiveness,
  setIsShowEditModal,
  setWillEditEquipment,
}: EquipmentCardProps) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const editRef = useRef<HTMLDivElement>(null);
  const [checkData, isCheckLoading, setCheckRequestObj] = useAxios({
    baseURL: 'https://detec.store:5000/',
  });
  const [cancelData, isCancelLoading, setCancelRequestObj] = useAxios({
    baseURL: 'https://detec.store:5000/',
  });
  const [progress, setProgress] = useState(100);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const toggleEditDropdown = () => {
    setIsShowDropdown(!isShowDropdown);
  };

  const fetchProgress = () => {
    const requestObj: RequestObj = {
      url: '/check',
      method: 'get',
    };
    if (isCheckLoading === false) {
      setCheckRequestObj(requestObj);
    }
  };

  const cancelProgress = () => {
    const isConfirm = confirm('학습을 취소하시겠습니까??');
    if (isConfirm) {
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
      const requestObj: RequestObj = {
        url: `stop/${equipment.name}`,
        method: 'get',
      };
      setCancelRequestObj(requestObj);
    }
  };

  useEffect(() => {
    if (isCheckLoading === false && checkData !== null) {
      const progressData = checkData as progressDataType;
      if (progressData.data === -1) {
        setProgress(100);
        if (intervalId !== null) {
          clearInterval(intervalId);
        }
      } else {
        setProgress(progressData.data);
      }
    }
  }, [checkData, isCheckLoading]);

  useEffect(() => {
    if (isCancelLoading === false && cancelData !== null) {
      if (intervalId !== null) {
        clearInterval(intervalId);
        fetchEquipments();
      }
    }
  }, [cancelData, isCancelLoading]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 setInterval 시작
    if (equipment.epoch >= 0 && equipment.training == false) {
      const id = setInterval(() => {
        fetchProgress();
      }, 1000);
      setIntervalId(id);
    } else {
      setProgress(100);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        setIsShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    };
  }, []);

  return (
    <EqCardDiv ischecked={equipment.able}>
      <div css={headerContainer}>
        <div css={titleContainer}>
          <h2>{equipment.description}</h2>
          <Switch
            checked={equipment.able}
            onChange={() => onToggleActiveness(equipment.type, equipment.name)}
          />
        </div>
        {/* <div ref={editRef}>
          <button css={menuButtonStyle} onClick={toggleEditDropdown}>
            <MoreVertIcon color="action" />
          </button>
          {isShowDropdown && (
            <EditDropdown
              equipment={equipment}
              onDelete={onDelete}
              setIsShowDropdown={setIsShowDropdown}
              setIsShowEditModal={setIsShowEditModal}
              setWillEditEquipment={setWillEditEquipment}
            />
          )}
        </div> */}
      </div>
      <div css={bodyContainer}>
        <img css={imageStyle} src={equipment.url} />
        <p css={descContainer}>
          {equipment.description === '' ? '(설명이 없습니다)' : equipment.name}
        </p>
      </div>
      <div css={footerContainer}>
        <ProgressBarContainerDiv>
          <ProgressBarDiv>
            <LinearProgress variant="determinate" value={progress} />
          </ProgressBarDiv>
          {progress < 100 && <CloseIcon onClick={cancelProgress} />}
        </ProgressBarContainerDiv>
        {progress < 100 ? (
          <ProgressContextDiv>학습 진행률: {progress}%</ProgressContextDiv>
        ) : (
          <ProgressContextDiv>학습 완료</ProgressContextDiv>
        )}
      </div>
    </EqCardDiv>
  );
}

export default EquipmentCard;

const EqCardDiv = styled.div<{ ischecked: boolean }>`
  position: relative;
  width: 22rem;
  max-width: 100%;
  padding: 1rem;
  transition: 0.2s all ease;
  background-color: ${props => props.theme.palette.neutral.section};
  opacity: ${props => (props.ischecked === false ? 0.5 : 1)};
  box-shadow: rgba(0, 0, 0, 0.125) 0px 4px 16px 0px;
  border-radius: 10px;
  ${mobileV} {
    width: 100%;
  }
`;

const headerContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const titleContainer = css`
  display: flex;
  width: 80%;
  align-items: center;
  h2 {
    max-width: 80%;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;

const menuButtonStyle = css`
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:active {
    svg {
      color: darkgray;
    }
  }
`;

const bodyContainer = css`
  margin-top: 10px;
`;

const footerContainer = css`
  margin-top: 10px;
`;

const ProgressBarContainerDiv = styled.div`
  display: flex;
  align-items: center;
  svg {
    cursor: pointer;
    &:hover {
      color: gray;
    }
    transition: color 0.3s ease;
  }
`;

const imageStyle = css`
  width: 100%;
  height: 250px;
  object-fit: cover;
`;

const descContainer = css`
  width: 100%;
  min-height: 3.5rem;
  margin-top: 10px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ProgressBarDiv = styled.div`
  /* display: flex; */
  width: 100%;
  height: 5px;
  background-color: ${props => props.theme.palette.neutral.card};
  border-radius: 20px;
`;

const ProgressContextDiv = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.palette.text.secondary};
  margin-top: 5px;
`;
