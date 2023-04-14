/*
  선언적으로 사고하여 구현하였음:
  ListItem은 부모로부터 MUI 아이콘, 레이블, 이동할 path, 현재 path, 핸들러를 입력 받아 단순히 렌더링한다
  여기에 더해서 이동할 path와 핸들러를 통해 라우팅을 하는 역할도 맡는다
*/

import styled from '@emotion/styled'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import { tabletV } from '@/utils/Mixin';

type ListItemProps = {
  icon: React.ReactNode,
  label: string,
  pathName: string,  // 이동할 경로
  currentPathName: string,  // 현재 머무르고 있는 경로
  clickHandler: (e: React.MouseEvent<HTMLLIElement>) => void
}

function ListItem({icon, label, pathName, currentPathName, clickHandler}: ListItemProps) {
  const navigate = useNavigate();

  const handleClickItem = (e: React.MouseEvent<HTMLLIElement>) => {
    clickHandler(e);  // 부모로부터 입력받은 핸들러 실행
    navigate(pathName);  // 이동할 경로를 향해 라우팅한다
  }
  return (
    <StyledLi currentPathName={currentPathName} pathName={pathName} onClick={(e) => handleClickItem(e)}>
      {/* MUI 아이콘 */}
      {icon}

      {/* 레이블 */}
      <p>{label}</p>
    </StyledLi>
  )
}

const StyledLi = styled.li<{currentPathName: string, pathName: string}>`
  height: 40px;
  display: flex;
  align-items: center;
  color: ${props => props.currentPathName === props.pathName ? props.theme.palette.primary.main : props.theme.palette.text.secondary};
  font-weight: ${props => props.currentPathName === props.pathName ? "bold" : "normal"};
  cursor: pointer;
  margin-bottom: 30px;
  @media(hover: hover) {
    &:hover {
      color: ${props => props.theme.palette.primary.main};
    }
  }
  p {
    font-size: 1.1rem;
    margin-left: 10px;
  }
`

export default ListItem