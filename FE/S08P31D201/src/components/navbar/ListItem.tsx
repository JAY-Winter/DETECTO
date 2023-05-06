/*
  선언적으로 사고하여 구현하였음:
  ListItem은 부모로부터 MUI 아이콘, 레이블, 이동할 path, 현재 path, 핸들러를 입력 받아 단순히 렌더링한다
  여기에 더해서 이동할 path와 핸들러를 통해 라우팅을 하는 역할도 맡는다
*/

import styled from '@emotion/styled'
import { useNavigate } from "react-router-dom";
import React from 'react'

type ListItemProps = {
  renderMode: 'desktop' | 'tablet' | 'mobile',
  icon: React.ReactNode,
  label?: string,
  pathName: string,  // 이동할 경로
  currentPathName: string,  // 현재 머무르고 있는 경로
  clickHandler?: (e: React.MouseEvent<HTMLLIElement>) => void
}

function ListItem({renderMode, icon, label, pathName, currentPathName, clickHandler}: ListItemProps) {
  const navigate = useNavigate();

  const handleClickItem = (e: React.MouseEvent<HTMLLIElement>) => {
    if (clickHandler) {
      clickHandler(e);  // 부모로부터 입력받은 핸들러 실행
    }
    navigate(pathName);  // 이동할 경로를 향해 라우팅한다
  }

  if (renderMode === 'desktop') {
    return (
      <StyledDesktopLi currentPathName={currentPathName} pathName={pathName} onClick={(e) => handleClickItem(e)}>
        {/* MUI 아이콘 */}
        {icon}

        {/* 레이블 */}
        <p>{label}</p>
      </StyledDesktopLi>
    )
  } else if (renderMode === 'tablet') {
    return (
      <StyledTabletLi currentPathName={currentPathName} pathName={pathName} onClick={(e) => handleClickItem(e)}>
        {/* MUI 아이콘 */}
        {icon}
      </StyledTabletLi>
    )
  } else if (renderMode === 'mobile') {
    return (
      <StyledMobileLi currentPathName={currentPathName} pathName={pathName} onClick={(e) => handleClickItem(e)}>
        {/* MUI 아이콘 */}
        {icon}
      </StyledMobileLi>
    )
  } else {
    return <li></li>
  }
}

const StyledDesktopLi = styled.li<{currentPathName: string, pathName: string}>`
  display: flex;
  align-items: center;
  color: ${props => props.currentPathName === props.pathName ? props.theme.palette.primary.main : props.theme.palette.text.secondary};
  font-weight: ${props => props.currentPathName === props.pathName ? "bold" : "normal"};
  cursor: pointer;
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

const StyledTabletLi = styled.li<{currentPathName: string, pathName: string}>`
  display: flex;
  align-items: center;
  background-color: ${props => props.currentPathName === props.pathName ? props.theme.palette.primary.main : props.theme.palette.neutral.card};
  color: ${props => props.currentPathName === props.pathName ? props.theme.palette.neutral.main : props.theme.palette.text.secondary};
  @media(hover: hover) {
    &:hover {
      color: ${props => props.currentPathName === props.pathName ? props.theme.palette.neutral.main : props.theme.palette.primary.main};
    }
  }
`

const StyledMobileLi = styled.li<{currentPathName: string, pathName: string}>`
  display: flex;
  align-items: center;
  color: ${props => props.currentPathName === props.pathName ? props.theme.palette.primary.main : props.theme.palette.text.secondary};
`

export default ListItem