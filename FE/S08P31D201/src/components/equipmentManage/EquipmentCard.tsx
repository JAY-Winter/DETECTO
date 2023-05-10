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

type EquipmentCardProps = {
  equipment: EquipmentType,
  onDelete: (willDeleteID: number) => void,
  onToggleActiveness: (willToggleID: number) => void,
}

type progressDataType = {
  data: number
}

function EquipmentCard({ equipment, onDelete, onToggleActiveness }: EquipmentCardProps) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const editRef = useRef<HTMLDivElement>(null);
  const [data, isCheckLoading, setCheckRequestObj] = useAxios({baseURL: "https://detec.store:5000/"});
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const toggleEditDropdown = () => {
    setIsShowDropdown(!isShowDropdown);
  }

  const getProgress = () => {
    const requestObj: RequestObj = {
      url: '/check',
      method: 'get'
    }
    if (isCheckLoading === false) {
      setCheckRequestObj(requestObj);
    }
  }

  useEffect(() => {
    if (isCheckLoading === false) {
      if (data !== null) {
        const progressData = data as progressDataType;
        console.log("EquipmentCard의 data:", progressData.data);
        if (progressData.data === -1) {
          setProgress(100);
          if (intervalId !== null) {
            clearInterval(intervalId);
          }
        } else {
          setProgress(progressData.data * 10);
        }
      }
    }
  }, [data, isCheckLoading])

  useEffect(() => {
    // 컴포넌트가 마운트될 때 setInterval 시작
    const id = setInterval(() => {
      getProgress();
    }, 1000);
    setIntervalId(id);

    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        setIsShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (intervalId !== null) {
        clearInterval(intervalId);
      }
    }
  }, [])

  return (
    <EqCardDiv ischecked={equipment.isActive}>
      <div css={headerContainer}>
        <div css={titleContainer}>
          <h2>{equipment.name}</h2>
          <Switch checked={equipment.isActive} onChange={() => onToggleActiveness(equipment.id)} />
        </div>
        <div ref={editRef}>
          <button css={menuButtonStyle} onClick={toggleEditDropdown}>
            <MoreVertIcon color="action" />
          </button>
          {isShowDropdown &&
            <EditDropdown id={equipment.id} onDelete={onDelete} setIsShowDropdown={setIsShowDropdown}/>
          }
        </div>
      </div>
      <div css={bodyContainer}>
        <img css={imageStyle} src={equipment.img} />
        <p css={descContainer}>{equipment.desc === "" ? "(설명이 없습니다)" : equipment.desc}</p>
      </div>
      <div css={footerContainer}>
        <ProgressBarDiv>
          <LinearProgress variant="determinate" value={progress} />
        </ProgressBarDiv>
        { progress < 100 ? 
          <ProgressContextDiv>학습 진행률: {progress}%</ProgressContextDiv> :
          <ProgressContextDiv>학습 완료</ProgressContextDiv>
        }
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
  opacity: ${props => props.ischecked === false ? 0.5 : 1};
  box-shadow: rgba(0, 0, 0, 0.125) 0px 4px 16px 0px;
  ${mobileV} {
    width: 100%;
  }
`;

const headerContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

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
`

const menuButtonStyle = css`
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:active {
    svg {
      color: darkgray;
    }
  }
`

const bodyContainer = css`
margin-top: 10px;
`

const footerContainer = css`
  margin-top: 10px;
`

const imageStyle = css`
  width: 100%;
  height: 250px;
  object-fit: cover;
`

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
`

const ProgressBarDiv = styled.div`
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
