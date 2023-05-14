import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Paper } from '@mui/material';
import SummaryItem from './Summary/SummaryItem';

function Summary() {
  // TODO: API요청

  return (
    <SummaryPaper elevation={0}>
      <SummaryItem title="24시간 내 위반사항" count={15} />
      <SummaryItem title="일주일 내 위반사항" count={350} />
      <SummaryItem title="한 달 내 위반사항" count={412} />
    </SummaryPaper>
  );
}

export default Summary;

const SummaryPaper = styled(Paper)`
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1.5rem;
  transition: 0.2s all ease;
  background-color: ${props => props.theme.palette.neutral.section};
  border-radius: 10px;
`;
