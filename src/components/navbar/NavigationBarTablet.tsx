import { mobileV, tabletV } from '@/utils/Mixin'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@components/navbar/ListItem';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import ModalPortal from '@components/common/ModalPortal';
import LeftModal from '@components/common/LeftModal';
import NavigationBar from './NavigationBar';


type NavigationBarTabletProps = {
  mode: 'dark' | 'light',
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>,
}

function NavigationBarTablet({mode, setMode}: NavigationBarTabletProps) {
  const location = useLocation();
  const [currentPathName, setCurrentPathName] = useState("");
  const [isShowLeftModal, setIsShowLeftModal] = useState(false);

  const handleClickMenu = () => {
    // portal로 네비게이션 바 띄우기
    setIsShowLeftModal(!isShowLeftModal);
    console.log(isShowLeftModal);
  }
  
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
    <div>
      { isShowLeftModal &&
      <ModalPortal>
        <LeftModal onClose={() => setIsShowLeftModal(false)}>
          <NavigationBar mode={mode} setMode={setMode} isModal={true} />
        </LeftModal>
      </ModalPortal>
      }
      <StyledNav>
        {/* Header */}
        <MenuButton onClick={handleClickMenu}>
          <MenuIcon />
        </MenuButton>

        {/* Body & Footer */}
        <div css={bodyContainer}>
          {/* 네비게이션 아이템들 */}
          <ul css={listContainer}>
            <ListItem renderMode='mini' icon={<SpaceDashboardOutlinedIcon fontSize='medium'/>} pathName="/dashboard" currentPathName={currentPathName} clickHandler={clickItemHandler} />
            <ListItem renderMode='mini' icon={<EngineeringOutlinedIcon  fontSize='medium'/>} pathName="/manage" currentPathName={currentPathName} clickHandler={clickItemHandler} />
            <ListItem renderMode='mini' icon={<ArticleOutlinedIcon  fontSize='medium'/>} pathName="/summary" currentPathName={currentPathName} clickHandler={clickItemHandler} />
          </ul>
          
          <div css={footerContainer}>
            {/* 테마 토글 버튼 */}
            <ThemeToggleButton mode={mode} onClick={() => handleToggleTheme()}>
              {mode === 'light' ? 
                <LightModeIcon /> :
                <DarkModeIcon />
              }
            </ThemeToggleButton>

            {/* 로그아웃 버튼 */}
            <LogoutButton onClick={() => handleClickLogout()}>
              <LogoutOutlinedIcon />
            </LogoutButton>
          </div>
        </div>
      </StyledNav>
    </div>
  )
}

const StyledNav = styled.nav`
  position: fixed;
  top: 0px;
  left: 0px;
  display: none;
  flex-direction: column;
  align-items: center;
  width: 70px;
  height: 100%;
  min-height: 700px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: ${props => props.theme.palette.neutral.section};
  color: ${props => props.theme.palette.text.primary};
  transition: background-color 0.3s ease;
  ${tabletV} {
    display: flex;
  }
  ${mobileV} {
    display: none;
  }
`

const MenuButton = styled.button`
  border: none;
  cursor: pointer;
  color: ${props => props.theme.palette.text.primary};
  background-color: transparent;
  margin-bottom: 50px;
`

const bodyContainer = css`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: space-between;
`

const listContainer = css`
  list-style: none;
  li {
    cursor: pointer;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`
const footerContainer = css`
  display: flex;
  flex-direction: column;
`

const ThemeToggleButton = styled.button<{mode: 'dark' | 'light'}>`
  border: none;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  color: ${props => props.theme.palette.text.primary};
  background-color: ${props => props.mode === 'light' ? props.theme.palette.secondary.main : props.theme.palette.primary.dark};
  margin-bottom: 20px;
  &:hover {
    background-color: ${props => props.mode === 'light' ? props.theme.palette.secondary.light : props.theme.palette.primary.main};
  }
`

const LogoutButton = styled.button`
  border: none;
  padding: 15px;
  border-radius: 10px;
  cursor: pointer;
  color: ${props => props.theme.palette.text.secondary};
  background-color: ${props => props.theme.palette.neutral.card};
  @media(hover: hover) {
    &:hover {
      color: red;
    }
  }
`

export default NavigationBarTablet