import authState from '@/store/authState'
import { mobileV, tabletV } from '@/utils/Mixin'
import styled from '@emotion/styled'
import { Button, TextField, css } from '@mui/material'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

function SignIn() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);

  const inputId = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setId(e.target.value.trim());
  }

  const inputPw = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPw(e.target.value.trim());
  }

  const submitSignInfo = () => {
    // 서버에게 요청 보내서 올바른 응답 코드가 날아와야 로그인 처리한다
    if (id === "admin" && pw === "admin") {
      setIsAuthenticated(true);
    } else {
      alert("아이디 또는 비밀번호 잘못 입력");
      setPw("");
    }
  }

  const clickLogin = () => {
    submitSignInfo();
  }

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      submitSignInfo();
    }
  }

  return (
    <div css={container}>
      <LeftContainerDiv>
      </LeftContainerDiv>
      <RightContainerDiv>
        <h1>로그인</h1>
        <LoginForm>
          <p>아이디</p>
          <TextField fullWidth size="medium" value={id} onChange={inputId} />
          <p>비밀번호</p>
          <TextField fullWidth size="medium" value={pw} onChange={inputPw} type="password" onKeyPress={handleOnKeyPress}/>
          <Button fullWidth variant="contained" size="large" onClick={clickLogin} disabled={id === "" || pw === "" }>
            로그인
          </Button>
        </LoginForm>
      </RightContainerDiv>
    </div>
  )
}

const container = css`
  position: relative;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  border-radius: 20px;
  box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1);
  width: 90vw;
  max-width: 1000px;
  overflow: hidden;
`

const LeftContainerDiv = styled.div`
  background-color: ${props => props.theme.palette.neutral.card};
  flex: 1;
  padding: 3rem;
  ${tabletV} {
    display: none;
  }
`



const RightContainerDiv = styled.div`
  background-color: ${props => props.theme.palette.neutral.section};
  flex: 2;
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    color: ${props => props.theme.palette.text.primary};
  }
`

const LoginForm = styled.form`
  color: ${props => props.theme.palette.text.primary};
  width: 100%;
  p {
    margin-top: 30px;
    margin-bottom: 5px;
  }
  button {
    margin-top: 30px;
  }
`

export default SignIn