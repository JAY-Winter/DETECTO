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
import ListItem from './ListItem';
import { mobileV, tabletV } from '@/utils/Mixin';

type NavigationBarProps = {
  mode: 'dark' | 'light',
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

function NavigationBar({mode, setMode}: NavigationBarProps) {
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

  // url 변경여부 감지 hook
  useEffect(() => {
    setCurrentPathName((oldState) => {
      if (oldState === location.pathname) {
        return oldState;
      } else {
        console.log('URL 변경:', location.pathname);
        return location.pathname;
      }
    })
  }, [location])

  return (
    <StyledNav>
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

      {/* 각종 아이템들 */}
      {/* <StyledIndicatorDibv /> */}
      <div css={itemsContainer}>
        {/* 네비게이션 아이템들 */}
        <ul css={listContainer}>
          <ListItem icon={<SpaceDashboardOutlinedIcon/>} label={"대시보드"} pathName="/dashboard" currentPathName={currentPathName} clickHandler={clickItemHandler} />
          <ListItem icon={<EngineeringOutlinedIcon/>} label={"보호구 관리"} pathName="/manage" currentPathName={currentPathName} clickHandler={clickItemHandler} />
          <ListItem icon={<ArticleOutlinedIcon/>} label={"리포트"} pathName="/summary" currentPathName={currentPathName} clickHandler={clickItemHandler} />
        </ul>
        
        {/* 로그아웃 버튼 */}
        <StyledButton onClick={handleClickLogout}>
          <LogoutOutlinedIcon />
          <p>로그아웃</p>
        </StyledButton>
      </div>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  min-width: 350px;
  height: 100vh;
  min-height: 700px;
  background-color: ${props => props.theme.palette.neutral.section};
  color: ${props => props.theme.palette.text.primary};
  transition: background-color 0.3s ease;
  padding: 20px;
  ${tabletV} {
    max-width: 85px;
    min-width: 85px;
    padding: 20px;
    min-height: 350px;
  }
`

const logoContainer = css`
  width: 100%;
  margin: 10px 0px 30px 0px;
  ${tabletV} {
    display: none;
  }
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
  ${tabletV} {
    display: none;
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

const itemsContainer = css`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  ${tabletV} {
    align-items: center;
  }
`

const listContainer = css`
  padding-left: 20px;
  list-style: none;
  margin-top: 50px;
  /* width: 100%; */
  li {
    &:last-child {
      margin-bottom: 0px;
    }
  }
  ${tabletV} {
    margin-top: 0px;
    padding-left: 0px;
  }
`

const StyledButton = styled.button`
  /* position: absolute;
  bottom: 20px; */
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
  ${tabletV} {
    p {
      display: none;
    }
    margin-left: 0px;
    background-color: ${props => props.theme.palette.neutral.card};
    padding: 15px;
    border-radius: 10px;
  }
`

export default NavigationBar