import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'
import ListItem from './ListItem'

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import { mobileV } from '@/utils/Mixin';

function NavigationBarMobile() {
  const location = useLocation();
  const [currentPathName, setCurrentPathName] = useState("");

  // url 변경여부 감지 hook
  useEffect(() => {
    setCurrentPathName((oldState) => {
      if (oldState === location.pathname) {
        return oldState;
      } else {
        return location.pathname;
      }
    })
  }, [location])

  return (
    <MobileNav>
      {/* 네비게이션 아이템들 */}
      <ul css={listContainer}>
        <ListItem renderMode='mobile' icon={<HomeOutlinedIcon fontSize='medium'/>} pathName="/history" currentPathName={currentPathName} />
        <ListItem renderMode='mobile' icon={<EngineeringOutlinedIcon  fontSize='medium'/>} pathName="/manage" currentPathName={currentPathName} />
        <ListItem renderMode='mobile' icon={<ArticleOutlinedIcon  fontSize='medium'/>} pathName="/dashboard" currentPathName={currentPathName} />
        <ListItem renderMode='mobile' icon={<VideocamOutlinedIcon/>} label={"모니터링"} pathName="/monitor" currentPathName={currentPathName} />
        <ListItem renderMode='mobile' icon={<MenuIcon  fontSize='medium'/>} pathName="/more" currentPathName={currentPathName} />
      </ul>
    </MobileNav>
  )
}

const MobileNav = styled.nav`
  display: none;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background-color: ${props => props.theme.palette.neutral.card};
  align-items: center;
  ${mobileV} {
    display: flex;
  }
`

const listContainer = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  list-style: none;
  li {
    cursor: pointer;
  }
`

export default NavigationBarMobile