import useAxios from '@/hooks/useAxios';
import { mobileV } from '@/utils/Mixin';
import { KeyboardArrowUp } from '@mui/icons-material';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import { RequestObj } from 'AxiosRequest';
import { ReportType } from 'ReportTypes';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';

function RaiseIssueButton({ report }: { report: ReportType }) {
  const userInfo = useRecoilValue(UserInfo);
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [submitted, setSubmmited] = useState(false);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const [data, isLoading, setRequestObj] = useAxios({
    baseURL: 'https://k8d201.p.ssafy.io/api/',
  });

  const submitHandler = () => {
    const requestObj: RequestObj = {
      url: 'objection',
      method: 'post',
      body: {
        userId: userInfo.id,
        reportId: report.id,
        comment: comment,
      },
    };
    // console.log(`[DEBUG - RaiseIssue] ${JSON.stringify(requestObj)}`);
    setRequestObj(requestObj);
    setSubmmited(true);
    setOpen(false);
    alert(`관리자에게 제출되었습니다.`);
  };

  return (
    <AccordionWrapper>
      <AccordionStyle
        open={open}
        expanded={submitted ? false : open ? true : false}
        disabled={report.status !== 'NOT_APPLIED' || submitted ? true : false}
      >
        <AccordionSummaryStyle
          expandIcon={<KeyboardArrowUp />}
          open={open}
          onClick={() => setOpen(!open)}
        >
          <Typography>
            {report.status !== 'NOT_APPLIED' ? '이의 제기 중' : '이의 제기'}
          </Typography>
        </AccordionSummaryStyle>
        <AccordionDetails>
          <ButtonWrapper>
            <TextFieldStyle
              label="이의 제기 메시지"
              placeholder="관리자에게 전송할 메시지를 입력해주세요."
              variant="filled"
              onChange={inputHandler}
              disabled={
                report.status !== 'NOT_APPLIED' || submitted ? true : false
              }
            />
            <ButtonStyle
              variant="contained"
              disabled={
                report.status !== 'NOT_APPLIED' || submitted ? true : false
              }
              onClick={submitHandler}
            >
              {report.status === 'NOT_APPLIED' && '이의 제기하기'}
              {report.status === 'PENDING' && '이의제기 중'}
            </ButtonStyle>
          </ButtonWrapper>
        </AccordionDetails>
      </AccordionStyle>
    </AccordionWrapper>
  );
}

export default RaiseIssueButton;

const AccordionWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;

  ${mobileV} {
    margin-right: 1rem;
  }
`;

const AccordionStyle = styled(Accordion)<{ open: boolean }>`
  float: right;
  min-height: 0.5rem;
  width: ${props => (props.open ? '100%' : '9rem')};
`;

const AccordionSummaryStyle = styled(AccordionSummary)<{ open: boolean }>`
  p {
    font-size: ${props => (props.open ? '1.1rem' : '0.9rem')};
    font-weight: ${props => props.open && 'bold'};
  }
  svg {
    width: ${props => (props.open ? '1.5rem' : '1rem')};
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;

  ${mobileV} {
    flex-direction: column;
  }
`;

const TextFieldStyle = styled(TextField)`
  width: 100%;
  margin-right: 0.5rem;

  label {
    font-size: 1rem;
  }

  input::placeholder {
    font-size: 1rem;
  }

  ${mobileV} {
    margin-right: 0;
  }
`;

const ButtonStyle = styled(Button)`
  min-width: 8rem;
  height: 100%;
  white-space: nowrap;

  ${mobileV} {
    margin-top: 1rem;
    float: right;
  }
`;
