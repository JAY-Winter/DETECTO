import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useRef } from 'react'
// import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

type EditDropdown = {
  id: number,
  onDelete: (willDeleteID: number) => void,
  setIsShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}

function EditDropdown({ id, onDelete, setIsShowDropdown }: EditDropdown) {
  const ref = useRef<HTMLDivElement>(null);

  const clickDeleteItem = () => {
    setIsShowDropdown(false);
    onDelete(id)
  }

  return (
    <DropdownNav ref={ref}>
      <ul>
        <li onClick={clickDeleteItem}>
          <p style={{color: "red"}}>삭제</p>
        </li>
        <li>
          <p>수정</p>
        </li>
      </ul>
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
`

const DropdownNav = styled.div`
  position: absolute;
  right: 10px;
  width: 8rem;
  background-color: ${props => props.theme.palette.neutral.card};
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
      background-color: ${props => props.theme.palette.neutral.main};
    }
  }
`

export default EditDropdown