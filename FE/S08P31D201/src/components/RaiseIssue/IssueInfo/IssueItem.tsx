import React from 'react';
import useAxios from '@/hooks/useAxios';
import { IssueType } from 'IssueTypes';
import styled from '@emotion/styled';
import { Button, Chip, Paper } from '@mui/material';
import IssueInfo from './IssueInfo';
import { timeFormatter } from '@/utils/Formatter';
import RowText from './RowText';
import { mobileV } from '@/utils/Mixin';

function IssueItem({
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

  const statusFormatter = (status: IssueType['status']) => {
    if (status === 'APPLIED') return '승인';
    if (status === 'PENDING') return '대기';
    if (status === 'REJECTED') return '거절';
  };

  return (
    <IssueWrapper>
      <PaperStyle state={issue.status} elevation={3}>
        <CellStyle>
          <ChipStyle state={issue.status}>
            {statusFormatter(issue.status)}
          </ChipStyle>
        </CellStyle>
        <CellStyle style={{ minWidth: '14rem' }}>
          <RowText title="신청 일자" content={timeFormatter(issue.createdAt)} />
        </CellStyle>
        <CellStyle style={{ width: '100%' }}>
          <IssueInfo issue={issue} />
        </CellStyle>
        <CellStyle>
          <Button
            onClick={cancelHandler}
            disabled={
              (issue.status === 'REJECTED' || issue.status === 'APPLIED') &&
              true
            }
          >
            취소하기
          </Button>
        </CellStyle>
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
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem 0.8rem;
  border-radius: 10px;

  ${mobileV} {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 1rem 1rem 2rem;
  }
`;

const CellStyle = styled.div`
  display: flex;
  align-items: flex-start;
  height: 100%;
  border-right: 2px solid ${props => props.theme.palette.neutral.card};
  padding: 0.5rem;

  :nth-of-type(1) {
    padding-right: 0.9rem;
  }

  :nth-last-of-type(1) {
    border-right: none;
  }

  button {
    width: 5rem;
    font-weight: bold;
    padding: 0;
    :hover {
      background-color: ${props => props.theme.palette.neutral.card};
    }
  }

  ${mobileV} {
    width: 100%;
    border-right: none;
    padding: 0.5rem 0;
    :nth-last-of-type(1) {
      display: flex;
      margin-top: 1rem;
      justify-content: flex-end;
    }
  }
`;

const ChipStyle = styled.div<{ state: IssueType['status'] }>`
  width: 4rem;
  text-align: center;
  border-radius: 10px;
  color: ${props =>
    props.state === 'REJECTED'
      ? props.theme.palette.error.main
      : props.state === 'APPLIED'
      ? props.theme.palette.success.main
      : props.theme.palette.secondary.main};
  font-weight: bold;
  font-size: 1.3rem;

  ${mobileV} {
    text-align: start;
    margin-bottom: 0.3rem;
  }
`;
