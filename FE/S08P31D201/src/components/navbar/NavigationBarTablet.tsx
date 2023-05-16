import { mobileV, tabletV } from '@/utils/Mixin'
import styled from '@emotion/styled'
import React, { useEffect, useState } from 'react'

import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@components/navbar/ListItem';
import { useLocation } from 'react-router-dom';
import { css, useTheme } from '@emotion/react';
import ModalPortal from '@components/common/ModalPortal';
import LeftModal from '@components/common/LeftModal';
import NavigationBar from './NavigationBar';
import { useSetRecoilState } from 'recoil';
import authState from '@/store/authState';
import useSignOut from '@/hooks/useSignOut';


type NavigationBarTabletProps = {
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>,
}

function NavigationBarTablet({ setMode }: NavigationBarTabletProps) {
  const theme = useTheme();
  const location = useLocation();
  const [currentPathName, setCurrentPathName] = useState("");
  const [isShowLeftModal, setIsShowLeftModal] = useState(false);
  const setIsAuthenticated = useSetRecoilState(authState);
  const setIsFire = useSignOut();

  const handleClickMenu = () => {
    // portal로 네비게이션 바 띄우기
    setIsShowLeftModal(!isShowLeftModal);
  }
  
  // 네비게이션 아이템 클릭했을 때의 핸들러 미리 정의
  // const clickItemHandler = (e: React.MouseEvent<HTMLLIElement>) => {
  // }

  // 로그아웃 핸들러
  const handleClickLogout = () => {
    const isConfirmToLogout = confirm("로그아웃 하시겠습니까??");
    if (isConfirmToLogout) {
      setIsFire(true);
    }
  }

  // 테마 변경 핸들러
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
          <NavigationBar setMode={setMode} isModal={true} />
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
            <ListItem renderMode='tablet' icon={<SpaceDashboardOutlinedIcon fontSize='medium'/>} pathName="/history" currentPathName={currentPathName} />
            <ListItem renderMode='tablet' icon={<EngineeringOutlinedIcon fontSize='medium'/>} pathName="/manage" currentPathName={currentPathName} />
            <ListItem renderMode='tablet' icon={<ArticleOutlinedIcon fontSize='medium'/>} pathName="/dashboard" currentPathName={currentPathName} />
            <ListItem renderMode='tablet' icon={<VideocamOutlinedIcon fontSize='medium'/>}pathName="/monitor" currentPathName={currentPathName} />
          </ul>
          
          <div css={footerContainer}>
            {/* 테마 토글 버튼 */}
            <ThemeToggleButton mode={theme.palette.mode} onClick={() => handleToggleTheme()}>
              {theme.palette.mode === 'light' ? 
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
  z-index: 999;
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