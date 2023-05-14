import React, { useState } from 'react';
import styled from '@emotion/styled';
import { mobileV } from '@/utils/Mixin';

type SummaryItemProps = {
  title: string;
  count: number;
};

function SummaryItem({ title, count }: SummaryItemProps) {
  return (
    <SummaryDiv>
      <SummaryTitleDiv>{title}</SummaryTitleDiv>
      <SummaryNumberDiv>
        <div>{count}</div>
      </SummaryNumberDiv>
    </SummaryDiv>
  );
}

export default SummaryItem;

const SummaryDiv = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
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
  margin-top: 0.3rem;
  margin-bottom: 0.5rem;
  word-break: keep-all;
`;

const SummaryNumberDiv = styled('div')`
  width: 100%;
  height: 100%;
  font-weight: bold;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  ${mobileV} {
    font-size: 2rem;
  }
`;
