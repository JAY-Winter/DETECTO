import { css, useTheme } from '@emotion/react'
import React from 'react'
import styled from '@emotion/styled'
import lightPreview from '@/assets/img/light-preview.png'
import darkPreview from '@/assets/img/dark-preview.png'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import authState from '@/store/authState'
import { UserInfo } from '@/store/userInfoStroe';
import DefaultProfile from '@/assets/img/default-profile.svg'

type MorePageProps = {
  setMode: React.Dispatch<React.SetStateAction<'dark' | 'light'>>,
}

function MorePage({ setMode }: MorePageProps) {
  const theme = useTheme()
  const userInfo = useRecoilValue(UserInfo);
  const setIsAuthenticated = useSetRecoilState(authState);

  // 로그아웃 핸들러
  const handleClickLogout = () => {
    const isConfirmToLogout = confirm("로그아웃 하시겠습니까??");
    if (isConfirmToLogout) {
      setIsAuthenticated(false);
    }
  }

  return (
    <div css={container}>
      <h1>더보기</h1>
      {/* 프로필 카드 */}
      <ProfileCardDiv>
        <img css={profileImageStyle} src={userInfo.img ?? DefaultProfile} alt="" />
        <div style={{marginLeft: "10px"}}>
          <p>{userInfo.name ?? "Unknown"} Pro</p>
          <p>{userInfo.division ?? "Unknown"}</p>
        </div>
      </ProfileCardDiv>
      <div css={temp}>
        {/* 테마 설정 */}
        <ThemeSelectDiv>
          <h3>테마 설정</h3>
          <label>
            <ThemeCardDiv>
              <div style={{display: "flex", alignItems: "center"}}>
                <img src={lightPreview} alt="" />
                <p>라이트 모드</p>
              </div>
              <input type="radio" name='tico' checked={theme.palette.mode === 'light'} onChange={() => setMode('light')}/>
            </ThemeCardDiv>
          </label>
          <label>
            <ThemeCardDiv>
              <div style={{display: "flex", alignItems: "center"}}>
                <img src={darkPreview} alt="" />
                <p>다크 모드</p>
              </div>
              <input type="radio" name='tico' checked={theme.palette.mode === 'dark'} onChange={() => setMode('dark')}/>
            </ThemeCardDiv>
          </label>
        </ThemeSelectDiv>
        {/* 로그아웃 버튼 */}
        <LogoutButton onClick={handleClickLogout}>
          <LogoutOutlinedIcon />
          <p>로그아웃</p>
        </LogoutButton>
      </div>
    </div>
  )
}

const temp = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
`

const container = css`
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
`

const ProfileCardDiv = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  width: 100%;
  p {
    &:first-of-type {
      font-size: 1.3rem;
      font-weight: bold;
      margin: 10px 0px;
    }
  }
`

const profileImageStyle = css`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 30px 0px rgba(0,0,0,0.15);
`

const ThemeSelectDiv = styled.div`
  margin-top: 30px;
`
const ThemeCardDiv = styled.div`
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    display: flex;
    justify-content: center;
    align-items: center;
    appearance: none;
    border: 2px solid gray;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }
  [type="radio"]:checked {
    background-color: ${props => props.theme.palette.neutral.card};
    border: 4px solid ${props => props.theme.palette.primary.main};
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
  }
  p {
    font-weight: bold;
    margin-left: 10px;
  }
`

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  color: ${props => props.theme.palette.text.primary};
  &:hover {
    color: red;
  }
  p {
    font-size: 1.1rem;
    margin-left: 10px;
  }
  cursor: pointer;
`

export default MorePage