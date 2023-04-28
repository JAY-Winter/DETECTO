import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { Switch, css } from '@mui/material';
import React from 'react';
import { EquipmentType } from 'EquipmentTypes';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditDropdown from './EditDropdown';
import { mobileV } from '@/utils/Mixin';

type EquipmentCardProps = {
  equipment: EquipmentType,
  onDelete: (willDeleteID: number) => void,
  onToggleActiveness: (willToggleID: number) => void,
}

// const dummy = "주며, 우리의 소금이라 동산에는 천지는 못하다 것이다. 무엇을 밝은 이상 소담스러운 갑 풀이 싶이 아름다우냐? 바로 것은 얼마나 청춘이 우리 실로 능히 아름다우냐? 할지라도 뛰노는 노래하며 소금이라 능히 수 않는 위하여 이상이 봄바람이다. 얼마나 광야에서 가치를 이 위하여서 있다. 천하를 생생하며, 황금시대를 같이, 피어나기 가치를 품으며, 이성은 교향악이다. 두손을 가진 가장 역사를 끓는 튼튼하며, 장식하는 주며, 청춘을 황금시대다. 것은 얼마나 그들에게 그러므로 많이 얼음과 대한 산야에 불어 아름다우냐? 원질이 가치를 것은 인간은 무엇을 천지는 무엇을 소금이라 것이다. 것이다.보라, 대고, 무엇을 무엇이 유소년에게서 듣는다.";


function EquipmentCard({ equipment, onDelete, onToggleActiveness }: EquipmentCardProps) {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const editRef = useRef<HTMLDivElement>(null);
  const toggleEditDropdown = () => {
    setIsShowDropdown(!isShowDropdown);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (editRef.current && !editRef.current.contains(e.target as Node)) {
        setIsShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [])

  return (
    <EqCardDiv ischecked={equipment.isActive.toString()}>
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
          <ProgressBarSpan />
        </ProgressBarDiv>
        <ProgressContextDiv>학습 진행률: 60%</ProgressContextDiv>
      </div>
    </EqCardDiv>
  );
}

export default EquipmentCard;

const EqCardDiv = styled.div<{ ischecked: string }>`
  width: 22rem;
  max-width: 100%;
  padding: 1rem;
  transition: 0.2s all ease;
  background-color: ${props => props.theme.palette.neutral.section};
  -webkit-filter: grayscale(${props => (props.ischecked === "true" ? 0 : 0.8)});
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

const ProgressBarSpan = styled.div`
  width: 60%;
  height: 5px;
  background-color: ${props => props.theme.palette.primary.main};
  border-radius: 20px;
`;

const ProgressContextDiv = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.palette.text.secondary};
  margin-top: 5px;
`;
