import React from 'react';
import useAxios from '@/hooks/useAxios';
import { IssueType } from 'IssueTypes';
import styled from '@emotion/styled';
import { Button, Chip, Paper } from '@mui/material';
import IssueInfo from './IssueInfo';

function IssueItem({ issue }: { issue: IssueType }) {
  const [data, isLoading, setRequestObj] = useAxios({
    baseURL: 'https://k8d201.p.ssafy.io/api/',
  });

  // TODO: delete API
  const cancelHandler = () => {
    setRequestObj({
      method: 'delete',
      url: `??`,
    });
    console.log(`[DEBUG] IssueItem - 이의제기 취소 ${issue.id}`);
    alert('취소되었습니다.');
  };

  const statusFormatter = (status: IssueType['status']) => {
    if (status === 'APPLIED') return '처리 완료';
    if (status === 'PENDING') return '처리 중';
    if (status === 'REJECTED') return '거절됨';
  };

  return (
    <IssueWrapper>
      <PaperStyle state={issue.status}>
        <TopRow>
          <ChipStyle
            label={statusFormatter(issue.status)}
            state={issue.status}
          />
          <Button
            onClick={cancelHandler}
            disabled={
              (issue.status === 'REJECTED' || issue.status === 'APPLIED') &&
              true
            }
          >
            취소하기
          </Button>
        </TopRow>
        <IssueInfo issue={issue} />
      </PaperStyle>
    </IssueWrapper>
  );
}

export default IssueItem;

const IssueWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const PaperStyle = styled(Paper)<{ state: IssueType['status'] }>`
  padding: 1.3rem;
  border: 3px solid
    ${props =>
      props.state === 'REJECTED'
        ? props.theme.palette.error.main
        : props.state === 'APPLIED'
        ? props.theme.palette.success.main
        : props.theme.palette.secondary.main};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    font-weight: bold;
  }
`;

const ChipStyle = styled(Chip)<{ state: IssueType['status'] }>`
  background-color: ${props =>
    props.state === 'REJECTED'
      ? props.theme.palette.error.main
      : props.state === 'APPLIED'
      ? props.theme.palette.success.main
      : props.theme.palette.secondary.main};
  color: ${props => props.theme.palette.primary.contrastText};
`;
