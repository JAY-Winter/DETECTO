import useAxios from '@/hooks/useAxios';
import { mobileV } from '@/utils/Mixin';
import styled from '@emotion/styled';
import { Button } from '@mui/material';
import { RequestObj } from 'AxiosRequest';
import { ReportType } from 'ReportTypes';
import React from 'react';

function RaiseIssueButton({ report }: { report: ReportType }) {
  const [data, isLoading, setRequestObj] = useAxios({
    baseURL: 'https://k8d201.p.ssafy.io/api/',
  });

  const submitHandler = () => {
    const requestObj: RequestObj = {
      url: 'report/foul',
      method: 'post',
      body: {
        report: report.id,
      },
    };
    console.log(`[DEBUG - RaiseIssue] ${JSON.stringify(requestObj)}`);
    setRequestObj(requestObj);
  };

  return (
    <ButtonStyle
      variant="contained"
      disabled={report.status !== 'NOT_APPLIED' ? true : false}
      onClick={submitHandler}
    >
      {report.status === 'NOT_APPLIED' && '이의 제기하기'}
      {report.status === 'PENDING' && '이의제기 중'}
    </ButtonStyle>
  );
}

export default RaiseIssueButton;

const ButtonStyle = styled(Button)`
  width: 100%;

  ${mobileV} {
    width: fit-content;
    margin: 1rem;
    float: right;
  }
`;
