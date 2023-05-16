import React from 'react';
import useAxios from '@/hooks/useAxios';
import { IssueType } from 'IssueTypes';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button } from '@mui/material';
import { mobileV } from '@/utils/Mixin';

function IssueItemBottom({
  issue,
  removeItem,
}: {
  issue: IssueType;
  removeItem: (id: number) => void;
}) {
  const [data, isLoading, setRequestObj] = useAxios({
    baseURL: 'https://k8d201.p.ssafy.io/api/',
  });

  const cancelHandler = () => {
    setRequestObj({
      method: 'delete',
      url: `objection/${issue.id}`,
    });
    alert('이의 제기가 취소되었습니다.');
    removeItem(issue.id);
  };

  return (
    <>
      <ImageWrapper>
        <img
          css={IssueImageStyle}
          src={`https://kr.object.ncloudstorage.com/detec/report/${issue.reportId}.jpg`}
          alt="report image"
        />
      </ImageWrapper>
      <ButtonWrapper>
        <Button
          variant="outlined"
          color="error"
          onClick={cancelHandler}
          disabled={
            (issue.status === 'REJECTED' || issue.status === 'APPLIED') && true
          }
        >
          취소하기
        </Button>
      </ButtonWrapper>
    </>
  );
}

export default IssueItemBottom;

const ImageWrapper = styled.div`
  width: 100%;
  min-height: 20rem;
  max-height: 20rem;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background-color: ${props => props.theme.palette.neutral.section};
`;

const IssueImageStyle = css`
  width: 100%;
  height: auto;
  object-fit: contain;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 1rem;

  ${mobileV} {
    padding: 1rem 0 0.5rem;
  }
`;
