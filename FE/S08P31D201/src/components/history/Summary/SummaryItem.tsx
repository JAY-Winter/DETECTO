import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Tabs, Tab, Box, Paper, css } from '@mui/material';
import { useRecoilState } from 'recoil';

type SummaryItemProps = {
  title: string;
  count: number;
};

function SummaryItem({ title, count }: SummaryItemProps) {
  return (
    <SummaryDiv>
      <SummaryTitleDiv>{title}</SummaryTitleDiv>
      <SummaryNumberDiv>{count}</SummaryNumberDiv>
    </SummaryDiv>
  );
}

export default SummaryItem;

const SummaryPaper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  transition: 0.2s all ease;
`;

const SummaryDiv = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: 1rem;
  height: 5rem;
  font-size: 0.8rem;
  border-right: 2px solid ${props => props.theme.palette.neutral.card};
  &:nth-last-of-type(1) {
    margin-right: 0;
    border-right: none;
  }
`;

const SummaryTitleDiv = styled('div')`
  width: 100%;
  margin: 0.5rem 0rem;
`;

const SummaryNumberDiv = styled('div')`
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 2.5rem;
`;
