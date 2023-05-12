import { css, useTheme, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { tabletV } from '@/utils/Mixin';
import { useSetRecoilState } from 'recoil';
import authState from '@/store/authState';
import useAxios from '@/hooks/useAxios';
import { UserInfo } from '@/store/userInfoStroe';
import { AxiosResponse, AxiosError } from 'axios';
import SamLogoLight from '@/assets/img/samlogoLight.svg';
import SamLogoDark from '@/assets/img/samlogoDark.svg';
import wavemainSVG from '@/assets/img/wavemain.svg';
import wavedarkSVG from '@/assets/img/wavedark.svg';
import wavelightSVG from '@/assets/img/wavelight.svg';
import { UserType } from 'UserTypes';

function SignIn() {
  const theme = useTheme();
  const [inputID, setInputID] = useState('');
  const [inputPW, setInputPW] = useState('');
  const setIsAuthenticated = useSetRecoilState(authState);
  const setUserInfo = useSetRecoilState(UserInfo);

  const tryHandler = (response: AxiosResponse) => {
    if (response.status === 200) {
      setIsAuthenticated(true);
      if (response.data) {
        const userInfo = response.data.data;
        // TODO: user type
        const type = 'admin'; // worker, admin
        const newUser: UserType = {
          id: userInfo.id,
          name: userInfo.userName,
          division: userInfo.division,
          img: userInfo.img,
          theme: userInfo.theme,
          type: type,
        };

        setUserInfo(newUser);
      }
    }
  };

  const catchHandler = (errorCode: number) => {
    switch (errorCode) {
      case 400:
        alert('아이디와 비밀번호를 확인해주세요');
        setInputPW('');
        break;
      case 401:
        alert('인증되지 않은 요청입니다');
        break;
      case 404:
        alert('리소스를 찾을 수 없습니다');
        break;
      case 500:
        alert('서버에서 오류가 발생했습니다');
        break;
      default:
        alert('알 수 없는 에러...');
    }
  };

  const [data, isLoading, setRequestObj] = useAxios({
    tryHandler: tryHandler,
    catchHandler: catchHandler,
    baseURL: 'https://k8d201.p.ssafy.io/api/',
  });

  // 아이디 입력 핸들러
  const handleChangeInputID = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputID(e.target.value.trim());
  };

  // 비밀번호 입력 핸들러
  const handleChangeInputPW = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setInputPW(e.target.value.trim());
  };

  // 서버에게 ID, PW 정보 보내서 로그인 처리한다
  const submitSignInfo = () => {
    setRequestObj({
      url: 'user/login',
      method: 'post',
      body: {
        id: Number(inputID),
        password: inputPW,
      },
    });
  };

  // 로그인 버튼 클릭 핸들링
  const clickLogin = () => {
    submitSignInfo();
  };

  // 로그인 버튼 엔터입력 핸들링
  const handleOnKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submitSignInfo();
    }
  };

  return (
    <div css={container}>
      <LeftContainerDiv>
        <WavelightDiv />
        <WavemainDiv />
        <WavedarkDiv />
      </LeftContainerDiv>
      <RightContainerDiv>
        <img
          css={logoContainer}
          src={theme.palette.mode === 'light' ? SamLogoLight : SamLogoDark}
        />
        <div css={lockIconStyle}>
          <LockOutlinedIcon />
        </div>
        <p>로그인</p>
        <TextField
          label="아이디"
          margin="normal"
          required
          fullWidth
          value={inputID}
          onChange={handleChangeInputID}
        />
        <TextField
          label="비밀번호"
          margin="normal"
          required
          fullWidth
          type="password"
          value={inputPW}
          onChange={handleChangeInputPW}
          onKeyPress={handleOnKeyPress}
        />
        <Button
          onClick={clickLogin}
          variant="contained"
          fullWidth
          style={{ marginTop: '30px' }}
          disabled={inputID.length < 1 || inputPW.length < 3 || isLoading}
        >
          {isLoading ? <CircularProgress size="1.7rem" /> : '로그인'}
        </Button>
        <ButtonContainerDiv>
          <button>관리자에게 문의하기</button>
        </ButtonContainerDiv>
      </RightContainerDiv>
    </div>
  );
}

const container = css`
  display: flex;
  height: 100%;
`;

const LeftContainerDiv = styled.div`
  position: relative;
  overflow: hidden;

  width: 60%;
  background: ${props =>
    `radial-gradient(white, ${props.theme.palette.primary.main})`};
  ${tabletV} {
    display: none;
  }
`;

const wave = keyframes`
  0% {
    margin-left: 0;
  }
  100% {
    margin-left: -1600px;
  }
`;

const swell = keyframes`
  0%, 100% {
    transform: translate3d(0,-35px,0);
  }
  50% {
    transform: translate3d(0,-10px,0);
  }
`;

const WavemainDiv = styled.div`
  background: url(${wavemainSVG}) repeat-x;
  position: absolute;
  bottom: 0;
  width: 6400px;
  height: 350px;

  animation: ${wave} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.155s infinite,
    ${swell} 7s ease -1.25s infinite;
  opacity: 1;
`;
const WavedarkDiv = styled.div`
  background: url(${wavedarkSVG}) repeat-x;
  position: absolute;
  bottom: 0px;
  width: 6400px;
  height: 350px;

  animation: ${wave} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.155s infinite;
`;
const WavelightDiv = styled.div`
  background: url(${wavelightSVG}) repeat-x;
  position: absolute;
  bottom: -25px;
  width: 6400px;
  height: 350px;

  animation: ${wave} 7s cubic-bezier(0.36, 0.45, 0.63, 0.53) -0.325s infinite,
    ${swell} 7s ease -1.55s infinite;
  opacity: 1;
`;

const RightContainerDiv = styled.div`
  width: 40%;
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
    0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  p {
    font-size: 1.8rem;
    margin-bottom: 10px;
  }
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${props => props.theme.palette.text.primary};
  padding: 4rem 2rem;
  ${tabletV} {
    width: 100%;
  }
`;

const logoContainer = css`
  width: 100%;
  max-width: 350px;
  margin-bottom: 50px;
`;

const lockIconStyle = css`
  background-color: #3571b5;
  color: white;
  padding: 8px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-content: center;
  margin-bottom: 10px;
`;

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
`;

export default SignIn;
