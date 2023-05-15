import React from 'react';
import RowText from '../RowText';
import { timeFormatter } from '@/utils/Formatter';
import { IssueType } from 'IssueTypes';

function IssueInfo({ issue }: { issue: IssueType }) {
  return (
    <>
      <RowText title="신청 일자" content={timeFormatter(issue.createdDate)} />
      <RowText title="신청 내역" content={issue.workerComment} />
      {issue.adminComment && (
        <RowText title="관리자 답변" content={issue.adminComment} />
      )}
    </>
  );
}

export default IssueInfo;
