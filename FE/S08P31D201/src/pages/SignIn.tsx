import { css, useTheme } from '@emotion/react'
import styled from '@emotion/styled'
import { Button, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tabletV } from '@/utils/Mixin';
import { useSetRecoilState } from 'recoil';
import authState from '@/store/authState';
import useAxios from '@/hooks/useAxios';
import { UserInfo } from '@/store/userInfoStroe';
import { AxiosError } from 'axios';
import SamLogoLight from '@/assets/img/samlogoLight.svg'
import SamLogoDark from '@/assets/img/samlogoDark.svg'

function SignIn() {
  const theme = useTheme();
  const axios = useAxios();
  const [inputID, setInputID] = useState("");
  const [inputPW, setInputPW] = useState("");
  const [isRequested, setIsRequested] = useState(false);  // 연속 클릭 방지를 위한 토글변수
  const setIsAuthenticated = useSetRecoilState(authState);
  const setUserInfo = useSetRecoilState(UserInfo);

  const handleChangeInputID = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputID(e.target.value.trim());
  }

  const handleChangeInputPW = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputPW(e.target.value.trim());
  }

  useEffect(() => {
    console.log(theme.palette.mode);
  }, [])

  // 서버에게 ID, PW 정보 보내서 로그인 처리한다
  const submitSignInfo = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: 'login',
        data: {
          id: inputID,
          pw: inputPW
        }
      })

      // 인증 성공
      if (response.status === 200) {
        setIsAuthenticated(true);
        //유저 정보 입력
        if (response.data) {
          setUserInfo(response.data);
        }
      }
    } catch(error) {  // 인증 실패
      setIsAuthenticated(false);
      // 에러 코드에 따라 다르게 대처하기
      const axiosError = error as AxiosError;
      switch (axiosError.response?.status) {
        case 400:
          alert('아이디와 비밀번호를 확인해주세요');
          setInputPW("");
          break;
        case 401:
          alert('인증되지 않은 요청입니다');
          break;
        case 404:
          alert('리소스를 찾을 수 없습니다');
          break;
        case 500:
          alert('서버에서 오류가 발생했습니다');
          break
        default:
          alert('알 수 없는 에러...')
      }
    } finally {
      setIsRequested(false);
    }
  }

  // 로그인 버튼 클릭 핸들링
  const clickLogin = () => {
    setIsRequested(true);
    submitSignInfo();
  }

  // 로그인 버튼 엔터입력 핸들링
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
        <img css={logoContainer} src={theme.palette.mode ==='light' ? SamLogoLight : SamLogoDark} />
        <div css={lockIconStyle}>
          <LockOutlinedIcon />
        </div>
        <p>로그인</p>
        <TextField label="아이디" margin="normal" required fullWidth value={inputID} onChange={handleChangeInputID} />
        <TextField label="비밀번호" margin="normal" required fullWidth type="password" value={inputPW} onChange={handleChangeInputPW} onKeyPress={handleOnKeyPress} />
        <Button onClick={clickLogin} variant="contained" fullWidth style={{marginTop: "30px"}} disabled={inputID.length < 5 || inputPW.length < 6 || isRequested}>
          {isRequested ?
            <CircularProgress size="1.7rem"/> :
            "로그인"
          }
        </Button>
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
  background: rgb(86,136,193);
  background: radial-gradient(circle, rgba(86,136,193,1) 0%, rgba(2,55,115,1) 100%);
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

const logoContainer = css`
  width: 100%;
  max-width: 350px;
  margin-bottom: 50px;
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