import styled from '@emotion/styled'
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react'

type ListItemProps = {
  icon: React.ReactNode,
  label: string,
  pathName: string,
  currentPathName: string,
  clickHandler: (e: React.MouseEvent<HTMLLIElement>) => void
}

function ListItem({icon, label, pathName, currentPathName, clickHandler}: ListItemProps) {
  const navigate = useNavigate();
  const handleClickItem = (e: React.MouseEvent<HTMLLIElement>) => {
    clickHandler(e);
    navigate(pathName);
  }
  return (
    <StyledLi currentPathName={currentPathName} pathName={pathName} onClick={(e) => handleClickItem(e)}>
      {icon}
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
  &:hover {
    color: ${props => props.theme.palette.primary.main}
  }
  p {
    font-size: 1.1rem;
    margin-left: 10px;
  }
`

export default ListItem