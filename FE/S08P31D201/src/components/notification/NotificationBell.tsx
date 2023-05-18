import React, { useEffect, useRef, useState } from 'react'
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { css } from '@emotion/react';
import NotificationList from './NotificationList';

function NotificationBell() {
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const clickHandler = () => {
    setIsShowDropdown(!isShowDropdown);
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  return (
    <div css={container} ref={dropdownRef} >
      <div css={countContainer}></div>
      <NotificationsOutlinedIcon onClick={clickHandler}/>
      {isShowDropdown &&
        <NotificationList setIsShowDropdown={setIsShowDropdown}/>
      }
    </div>
  )
}

const container = css`
  position: absolute;
  top: 2.5rem;
  right: 1.8rem;
  cursor: pointer;
`

const countContainer = css`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: -5px;
  right: -5px;
  background-color: red;
`

export default NotificationBell