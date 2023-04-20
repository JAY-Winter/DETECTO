import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { useLocation, NavLink } from "react-router-dom";

import SamLogoLight from '@/assets/img/samlogoLight.svg'
import SamLogoDark from '@/assets/img/samlogoDark.svg'
import Albert from '@/assets/img/albert.jpg'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ListItem from './ListItem';
import { Switch } from '@mui/material';
import { tabletV } from '@/utils/Mixin';

type NavigationBarProps = {
  mode: 'dark' | 'light',
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>,
  isModal?: boolean
}

function NavigationBar({mode, setMode, isModal=false}: NavigationBarProps) {
  const location = useLocation();
  const [currentPathName, setCurrentPathName] = useState("");

  // 네비게이션 아이템 클릭했을 때의 핸들러 미리 정의
  const clickItemHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();  // 클릭된 아이템의 레이아웃 정보를 알아낸다
    const itemTopPos = rect.top;  // 클릭된 아이템의 최상위 지점의 위치를 알아낸다
  }

  // 로그아웃 핸들러
  const handleClickLogout = () => {
    confirm("로그아웃 하시겠습니까??");
  }

  const handleToggleTheme = () => {
    setMode((oldState) => {
      if (oldState === 'light') {
        return 'dark';
      } else {
        return 'light';
      }
    })
  }

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
    <StyledNav isModal={isModal}>
      {/* Header */}
      {/* 삼성 로고 */}
      <NavLink to={'/'}>
        <img css={logoContainer} src={mode ==='light' ? SamLogoLight : SamLogoDark} />
      </NavLink>

      {/* 프로필 카드 */}
      <ProfileCardDiv>
        <img css={profileImageStyle} src={Albert} alt="" />
        <p>{"아인슈타인"} Pro</p>
        <p>{"삼성전기 안전관리1팀"}</p>
      </ProfileCardDiv>

      {/* Body & Footer */}
      {/* <StyledIndicatorDibv /> */}
      <div css={bodyContainer}>
        {/* 네비게이션 아이템들 */}
        <ul css={listContainer}>
          <ListItem renderMode='full' icon={<SpaceDashboardOutlinedIcon/>} label={"대시보드"} pathName="/dashboard" currentPathName={currentPathName} clickHandler={clickItemHandler} />
          <ListItem renderMode='full' icon={<EngineeringOutlinedIcon/>} label={"보호구 관리"} pathName="/manage" currentPathName={currentPathName} clickHandler={clickItemHandler} />
          <ListItem renderMode='full' icon={<ArticleOutlinedIcon/>} label={"리포트"} pathName="/summary" currentPathName={currentPathName} clickHandler={clickItemHandler} />
        </ul>
        
        <div css={footerContainer}>
          {/* 로그아웃 버튼 */}
          <StyledButton onClick={handleClickLogout}>
            <LogoutOutlinedIcon />
            <p>로그아웃</p>
          </StyledButton>
          {/* 테마 토글 버튼 */}
          <div css={switchContainer}>
            <LightModeIcon />
            <Switch color="default" checked={mode === 'dark' ? true : false} onChange={handleToggleTheme}/>
            <DarkModeIcon />
          </div>
        </div>
      </div>
    </StyledNav>
  )
}

const StyledNav = styled.nav<{isModal: boolean}>`
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 100%;
  min-height: 700px;
  background-color: ${props => props.theme.palette.neutral.section};
  color: ${props => props.theme.palette.text.primary};
  transition: background-color 0.3s ease;
  padding: 20px;
  ${tabletV} {
    display: ${props => props.isModal ? 'flex' : 'none'};
  }
`

const StyledHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0px;
  svg {
    color: ${props => props.theme.palette.text.primary};
    font-size: 2rem;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`

const logoContainer = css`
  width: 100%;
  height: 3rem;
  /* padding: 0px 10px; */
  /* margin-left: 10px; */
  margin: 10px 0px 30px 0px;
`

const ProfileCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: ${props => props.theme.palette.neutral.card};
  border-radius: 10px;
  padding: 20px;
  p {
    &:first-of-type {
      font-size: 1.3rem;
      font-weight: bold;
      margin: 10px 0px;
    }
  }
`

const profileImageStyle = css`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.15);
`

const StyledIndicatorDibv = styled.div`
  position: absolute;
  width: 7px;
  height: 50px;
  border-radius: 0px 30px 30px 0px;
  background-color: ${props => props.theme.palette.primary.main};
`

const bodyContainer = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const listContainer = css`
  padding-left: 20px;
  list-style: none;
  margin-top: 50px;
  li {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`

const footerContainer = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  color: ${props => props.theme.palette.text.secondary};
  background-color: transparent;
  border: none;
  margin-left: 20px;
  &:hover {
    color: red;
  }
  p {
    font-size: 1.1rem;
    margin-left: 10px;
  }
  cursor: pointer;
`

const switchContainer = css`
  display: flex;
  align-items: center;
`

export default NavigationBar