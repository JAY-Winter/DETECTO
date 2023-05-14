import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import SummaryItem from './Summary/SummaryItem';

function Summary() {
  // TODO: API요청

  return (
    <SummaryPaper elevation={2}>
      <SummaryItem title="24시간 내 위반사항" count={15} />
      <SummaryItem title="일주일 내 위반사항" count={350} />
      <SummaryItem title="한 달 내 위반사항" count={412} />
    </SummaryPaper>
  );
}

export default Summary;

const SummaryPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  transition: 0.2s all ease;
`;
