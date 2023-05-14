import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Card, Input } from '@mui/material';
import { ReportType } from 'ReportTypes';
import { stringListFormatter, timeFormatter } from '@/utils/Formatter';
import RaiseIssueButton from './RaiseIssueButton';

function RaiseIssue({ report }: { report: ReportType }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2 style={{ margin: '0.5rem 0 1rem 0' }}>위반 내역</h2>
      <DetailInfoDiv>
        <div>
          <h4>위반 일시</h4>
          <p>{timeFormatter(report.time)}</p>
          <h4>소속 팀</h4>
          <p>{report.team.teamName}팀</p>
          <h4>위반 사항</h4>
          <p>{stringListFormatter(report.reportItems)}</p>
          <h4>위반 지역</h4>
          <p>{report.cctvArea}번 구역</p>
        </div>
        <RaiseIssueButton report={report} />
      </DetailInfoDiv>
    </div>
  );
}

export default RaiseIssue;

const DetailInfoDiv = styled(Card)`
  width: 100%;
  height: 100%;
  max-width: 350px;
  padding: 2rem 1.5rem;
  background-color: ${props => props.theme.palette.neutral.card};
  border-radius: 12px;

  p {
    margin-bottom: 1rem;
  }
`;
