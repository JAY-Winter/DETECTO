import React from 'react';
import RowText from './RowText';
import { IssueType } from 'IssueTypes';
import styled from '@emotion/styled';

function IssueInfo({ issue }: { issue: IssueType }) {
  return (
    <InfoWrapper>
      <RowText title="신청 내역" content={issue.comment} />
      {issue.adminComment && (
        <RowText title="관리자 답변" content={issue.adminComment} />
      )}
    </InfoWrapper>
  );
}

export default IssueInfo;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
