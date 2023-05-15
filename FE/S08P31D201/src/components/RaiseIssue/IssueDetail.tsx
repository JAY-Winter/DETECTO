import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Card, Input } from '@mui/material';
import { ReportType } from 'ReportTypes';
import { stringListFormatter, timeFormatter } from '@/utils/Formatter';

function IssueDetail({ report }: { report: ReportType }) {
  return (
    <Wrapper>
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
      </DetailInfoDiv>
    </Wrapper>
  );
}

export default IssueDetail;

const Wrapper = styled.div`
  width: 100%;
  height: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailInfoDiv = styled(Card)`
  width: 100%;
  height: 100%;
  max-width: 350px;
  padding: 2rem 1.5rem;
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 12px;

  p {
    margin-bottom: 1rem;
  }
`;
