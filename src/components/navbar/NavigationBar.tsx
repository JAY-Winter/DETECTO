import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation, NavLink } from "react-router-dom";

import SamLogoLight from '@/assets/img/samlogoLight.svg'
import SamLogoDark from '@/assets/img/samlogoDark.svg'
import Albert from '@/assets/img/albert.jpg'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ListItem from './ListItem';

type NavigationBarProps = {
  mode: 'dark' | 'light',
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>;
}

function NavigationBar({mode, setMode}: NavigationBarProps) {
  const location = useLocation();
  const [currentPathName, setCurrentPathName] = useState("");

  const clickItemHandler = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const itemTopPos = rect.top;
    console.log(itemTopPos);
  }

  const handleClickLogout = () => {
    confirm("로그아웃 하시겠습니까??");
  }

  useEffect(() => {
    setCurrentPathName((oldState) => {
      if (oldState === location.pathname) {
        return oldState;
      } else {
        console.log('URL이 변경되었습니당:', location.pathname);
        return location.pathname;
      }
    })
  }, [location])

  return (
    <StyledNav>
      <img css={imageContainer} src={mode ==='light' ? SamLogoLight : SamLogoDark} />
      <ProfileCardDiv>
        <img css={profileImageStyle} src={Albert} alt="" />
        <p>{"아인슈타인"} Pro</p>
        <p>{"삼성전기 안전관리1팀"}</p>
      </ProfileCardDiv>
      {/* <StyledIndicatorDibv /> */}
      <ul css={listContainer}>
        <ListItem icon={<SpaceDashboardOutlinedIcon/>} label={"대시보드"} pathName="/dashboard" currentPathName={currentPathName} clickHandler={clickItemHandler} />
        <ListItem icon={<EngineeringOutlinedIcon/>} label={"보호구 관리"} pathName="/manage" currentPathName={currentPathName} clickHandler={clickItemHandler} />
        <ListItem icon={<ArticleOutlinedIcon/>} label={"리포트"} pathName="/summary" currentPathName={currentPathName} clickHandler={clickItemHandler} />
      </ul>
      <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>현재 테마: {mode}</button>
      <StyledButton onClick={handleClickLogout}>
        <LogoutOutlinedIcon />
        <p>로그아웃</p>
      </StyledButton>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  max-width: 350px;
  height: 100vh;
  background-color: ${props => props.theme.palette.neutral.section};
  color: ${props => props.theme.palette.text.primary};
  transition: all 0.3s ease;
  padding: 20px;
`

const imageContainer = css`
  width: 100%;
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

const listContainer = css`
  padding-left: 20px;
  list-style: none;
  margin-top: 50px;
  li {
    &:last-child {
      margin-bottom: 0px;
    }
  }
`

const StyledButton = styled.button`
  position: absolute;
  bottom: 20px;
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
    font-size: 1.3rem;
    margin-left: 10px;
  }
  cursor: pointer;
`



export default NavigationBar