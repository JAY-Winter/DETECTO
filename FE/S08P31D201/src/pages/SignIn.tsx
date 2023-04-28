import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tabletV } from '@/utils/Mixin';
import { useSetRecoilState } from 'recoil';
import authState from '@/store/authState';
import backBlue from '@/assets/img/back-blue.jpg';

function SignIn() {
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [isRequested, setIsRequested] = useState(false);  // 연속 클릭 방지를 위한 토글변수
  const setIsAuthenticated = useSetRecoilState(authState);

  const handleChangeInputID = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputID(e.target.value.trim());
  }

  const handleChangeInputPW = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputPW(e.target.value.trim());
  }

  const submitSignInfo = async () => {
    // 서버에게 요청 보내서 올바른 응답 코드가 날아와야 로그인 처리한다
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({id: inputID, pw: inputPW})
    })
    setIsRequested(false);
    if (response.status === 200) {
      setIsAuthenticated(true);
    } else {
      alert('아이디와 비밀번호를 확인해주세요');
      setIsAuthenticated(false);
      setInputPW("");
    }
  }

  const clickLogin = () => {
    setIsRequested(true);
    submitSignInfo();
  }

  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === "Enter") {
      setIsRequested(true);
      submitSignInfo();
    }
  }

  return (
    <div css={container}>
      <LeftContainerDiv>

      </LeftContainerDiv>
      <RightContainerDiv>
        <div css={lockIconStyle}>
          <LockOutlinedIcon />
        </div>
        <p>로그인</p>
        <TextField label="아이디" margin="normal" required fullWidth value={inputID} onChange={handleChangeInputID} />
        <TextField label="비밀번호" margin="normal" required fullWidth type="password" value={inputPW} onChange={handleChangeInputPW} onKeyPress={handleOnKeyPress} />
        <Button onClick={clickLogin} variant="contained" fullWidth style={{marginTop: "30px"}} disabled={inputID === "" || inputPW === "" || isRequested}>로그인</Button>
        <ButtonContainerDiv>
          <button>관리자에게 문의하기</button>
        </ButtonContainerDiv>
      </RightContainerDiv>
    </div>
  )
}

const container = css`
  display: flex;
  height: 100%;
`

const LeftContainerDiv = styled.div`
  width: 60%;
  background-image: url(${backBlue});
  background-size: cover;
  ${tabletV} {
    display: none;
  }
`

const RightContainerDiv = styled.div`
  width: 40%;
  box-shadow: 0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12);;
  p {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  ${tabletV} {
    width: 100%;
  }
`
const lockIconStyle = css`
  background-color: #3571b5;
  color: white;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 10px;
`

const ButtonContainerDiv = styled.div`
  margin-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  button {
    transition: color ease 300ms;
    color: ${props => props.theme.palette.primary.main};
    text-decoration: underline;
    cursor: pointer;
    font-size: 1rem;
    background-color: transparent;
    border: none;
    &:hover {
      color: ${props => props.theme.palette.primary.light};
    }
  }
`

export default SignIn