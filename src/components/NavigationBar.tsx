import { css } from '@emotion/react'
import styled from '@emotion/styled'
import React, { useRef, useState } from 'react'
import SamLogoLight from '@/assets/img/samlogoLight.svg'
import SamLogoDark from '@/assets/img/samlogoDark.svg'
import Albert from '@/assets/img/albert.jpg'
import SpaceDashboardOutlinedIcon from '@mui/icons-material/SpaceDashboardOutlined';
import EngineeringOutlinedIcon from '@mui/icons-material/EngineeringOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

type NavigationBarProps = {
  mode: 'dark' | 'light'
}

function NavigationBar({mode}: NavigationBarProps) {
  const [selectedItem, setSelectedItem] = useState(0);
  const itemRef = useRef();

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const itemTopPos = rect.top;
    console.log(itemTopPos);
  }

  return (
    <StyledNav>
      <img css={imageContainer} src={mode ==='light' ? SamLogoLight : SamLogoDark} />
      <ProfileCardDiv>
        <img css={profileImageStyle} src={Albert} alt="" />
        <p>{"아인슈타인"} Pro</p>
        <p>{"삼성전기 안전관리1팀"}</p>
      </ProfileCardDiv>
      <StyledIndicatorDibv />
      <ul css={listContainer}>
        <StyledLi onClick={handleItemClick}>
          <SpaceDashboardOutlinedIcon />
          <p>대시보드</p>
        </StyledLi>
        <StyledLi onClick={handleItemClick}>
          <EngineeringOutlinedIcon />
          <p>보호구 관리</p>
        </StyledLi>
        <StyledLi onClick={handleItemClick}>
          <ArticleOutlinedIcon />
          <p>리포트</p>
        </StyledLi>
      </ul>
      <StyledButton>
        <LogoutOutlinedIcon />
        <p>로그아웃</p>
      </StyledButton>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  width: 350px;
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

const StyledLi = styled.li`
  height: 40px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.palette.text.secondary};
  cursor: pointer;
  margin-bottom: 30px;
  &:hover {
    color: ${props => props.theme.palette.primary.main}
  }
  p {
    font-size: 1.3rem;
    margin-left: 10px;
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