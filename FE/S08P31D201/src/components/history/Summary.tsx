import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Tabs, Tab, Box, Paper, css } from '@mui/material';
import SummaryItem from './Summary/SummaryItem';

function Summary() {
  return (
    <SummaryPaper elevation={0}>
      <SummaryItem title="오늘의 위반사항 수" count={159} />
      <SummaryItem title="총 위반사항 수" count={350} />
      <SummaryItem title="총 위반자 수" count={10} />
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
`;
