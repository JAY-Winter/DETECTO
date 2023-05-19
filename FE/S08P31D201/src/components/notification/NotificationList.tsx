import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React from 'react'

type NotificationListProps = {
  setIsShowDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

function NotificationList({ setIsShowDropdown }: NotificationListProps) {
  return (
    <DropdownNav>
      <li onClick={() => setIsShowDropdown(false)}>안녕1</li>
      <li>안녕2</li>
      <li>안녕3</li>
      <li>안녕4</li>
      <li>안녕5</li>
      <li>안녕6</li>
      <li>안녕7</li>
    </DropdownNav>
  )
}

const scaleUp = keyframes`
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }
 
  100% {
    transform: scale(1);
  }
`;

const DropdownNav = styled.nav`
  z-index: 999;
  position: absolute;
  right: 10px;
  width: 20rem;
  max-height: 20rem;
  overflow: auto;
  background-color: ${props => props.theme.palette.neutral.section};
  border: 1px solid ${props => props.theme.palette.neutral.card};
  border-radius: 10px;
  padding: 7px;
  animation: ${scaleUp} 0.2s ease;
  li {
    list-style: none;
    border-radius: 10px;
    cursor: pointer;
    padding: 1rem;
    &:active {
      background-color: darkgray;
    }
    &:hover {
      background-color: ${props => props.theme.palette.neutral.card};
    }
  }
`;

export default NotificationList