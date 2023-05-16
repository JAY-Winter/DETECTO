import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useState, useEffect } from 'react'
import { useLocation, NavLink } from "react-router-dom";

import SamLogoLight from '@/assets/img/samlogoLight.svg'
import SamLogoDark from '@/assets/img/samlogoDark.svg'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ListItem from './ListItem';
import { Switch } from '@mui/material';
import { tabletV } from '@/utils/Mixin';
import authState from '@/store/authState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';
import DefaultProfile from '@/assets/img/default-profile.svg'
import useSignOut from '@/hooks/useSignOut';

type NavigationBarProps = {
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>,
  isModal?: boolean
}

function NavigationBar({setMode, isModal=false}: NavigationBarProps) {
  const theme = useTheme();
  const location = useLocation();
  const [currentPathName, setCurrentPathName] = useState("");
  const setIsAuthenticated = useSetRecoilState(authState);
  const userInfo = useRecoilValue(UserInfo);
  const [selectedItemOffsetTop, setSelectedItemOffsetTop] = useState(0);
  const setIsFire = useSignOut();

  // 로그아웃 핸들러
  const handleClickLogout = () => {
    const isConfirmToLogout = confirm("로그아웃 하시겠습니까??");
    if (isConfirmToLogout) {
      setIsFire(true);
    }
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
        <img css={logoContainer} src={theme.palette.mode ==='light' ? SamLogoLight : SamLogoDark} />
      </NavLink>

      {/* 프로필 카드 */}
      <ProfileCardDiv>
        <img css={profileImageStyle} src={userInfo.img ?? DefaultProfile} alt="" />
        <p>{userInfo.name ?? "Unknown"} Pro</p>
        <p>{userInfo.division ?? "Unknown"}</p>
      </ProfileCardDiv>

      {/* Body & Footer */}
      <div css={bodyContainer}>
        {/* 네비게이션 아이템들 */}
        <ul css={listContainer}>
          <StyledIndicatorDiv selectedItemOffsetTop={selectedItemOffsetTop}/>
          <ListItem renderMode='desktop' icon={<SpaceDashboardOutlinedIcon/>} label={"히스토리"} pathName="/history" currentPathName={currentPathName} onSetOffset={setSelectedItemOffsetTop} />
          <ListItem renderMode='desktop' icon={<EngineeringOutlinedIcon/>} label={"보호구 관리"} pathName="/manage" currentPathName={currentPathName} onSetOffset={setSelectedItemOffsetTop} />
          <ListItem renderMode='desktop' icon={<ArticleOutlinedIcon/>} label={"대시보드"} pathName="/dashboard" currentPathName={currentPathName} onSetOffset={setSelectedItemOffsetTop} />
          <ListItem renderMode='desktop' icon={<VideocamOutlinedIcon/>} label={"모니터링"} pathName="/monitor" currentPathName={currentPathName} onSetOffset={setSelectedItemOffsetTop} />
          <ListItem renderMode='desktop' icon={<VideocamOutlinedIcon/>} label={"모니터링"} pathName="/12314361ASDKAJHSDF" currentPathName={currentPathName} onSetOffset={setSelectedItemOffsetTop} />
        </ul>
        
        <div css={footerContainer}>
          {/* 로그아웃 버튼 */}
          <LogoutButton onClick={handleClickLogout}>
            <LogoutOutlinedIcon />
            <p>로그아웃</p>
          </LogoutButton>
          {/* 테마 토글 버튼 */}
          <div css={switchContainer}>
            <LightModeIcon color={theme.palette.mode === 'light' ? 'secondary' : 'disabled'}/>
            <Switch color="default" checked={theme.palette.mode === 'dark' ? true : false} onChange={handleToggleTheme}/>
            <DarkModeIcon color={theme.palette.mode === 'dark' ? 'primary' : 'disabled'}/>
          </div>
        </div>
      </div>
    </StyledNav>
  )
}

const StyledNav = styled.nav<{isModal: boolean}>`
  z-index: 999;
  display: flex;
  position: fixed;
  top: 0px;
  left: 0px;
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

const StyledIndicatorDiv = styled.div<{selectedItemOffsetTop: number}>`
  position: absolute;
  transition: 0.3s;
  top: ${props => props.selectedItemOffsetTop-8 + "px"};
  left: -20px;
  width: 7px;
  height: 45px;
  border-radius: 0px 10px 10px 0px;
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
  position: relative;
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

const LogoutButton = styled.button`
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