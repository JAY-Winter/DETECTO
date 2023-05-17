import React from 'react';
import styled from '@emotion/styled';
import { timeFormatter } from '@/utils/Formatter';
import { mobileV } from '@/utils/Mixin';
import { IssueType } from 'IssueTypes';
import IssueInfo from './IssueInfo';
import RowText from './RowText';
import { css } from '@emotion/react';

function IssueItemTop({ issue }: { issue: IssueType }) {
  const statusFormatter = (status: IssueType['status']) => {
    if (status === 'APPLIED') return '승인';
    if (status === 'PENDING') return '대기';
    if (status === 'REJECTED') return '거절';
  };

  return (
    <>
      <CellStyle>
        <ChipStyle state={issue.status}>
          {statusFormatter(issue.status)}
        </ChipStyle>
      </CellStyle>
      <CellStyle css={DateCellStyle}>
        <RowText title="신청 일자" content={timeFormatter(issue.createdAt)} />
      </CellStyle>
      <CellStyle style={{ width: '100%' }}>
        <IssueInfo issue={issue} />
      </CellStyle>
    </>
  );
}

export default IssueItemTop;

const CellStyle = styled.div`
  display: flex;
  align-items: flex-start;
  border-left: 2px solid ${props => props.theme.palette.neutral.card};
  padding: 0.5rem;

  :nth-of-type(1) {
    padding-right: 0.9rem;
    border-left: none;
  }

  :nth-last-of-type(1) {
    margin-right: 0.5rem;
  }

  ${mobileV} {
    border-left: none;
  }
`;

const DateCellStyle = css`
  min-width: 20rem;
  ${mobileV} {
    min-width: 10rem;
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
