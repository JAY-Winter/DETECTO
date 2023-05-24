import React from 'react';

import { IssueType } from 'IssueTypes';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
} from '@mui/material';
import { mobileV } from '@/utils/Mixin';
import { KeyboardArrowDown } from '@mui/icons-material';
import IssueItemTop from './IssueItemTop';
import IssueItemBottom from './IssueItemBottom';

function IssueItem({
  issue,
  removeItem,
}: {
  issue: IssueType;
  removeItem: (id: number) => void;
}) {
  return (
    <IssueWrapper>
      <PaperStyle state={issue.status} elevation={2}>
        <AccordionStyle>
          <AccordionSummaryStyle
            expandIcon={<KeyboardArrowDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <IssueItemTop issue={issue} />
          </AccordionSummaryStyle>
          <AccordionDetails>
            <IssueItemBottom issue={issue} removeItem={removeItem} />
          </AccordionDetails>
        </AccordionStyle>
      </PaperStyle>
    </IssueWrapper>
  );
}

export default IssueItem;

const IssueWrapper = styled.div`
  margin-bottom: 1rem;
  width: 100%;
`;

const PaperStyle = styled(Paper)<{ state: IssueType['status'] }>`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const AccordionStyle = styled(Accordion)`
  width: 100%;
  box-shadow: none;
  border-radius: 10px;

  :hover {
    background-color: ${props => props.theme.palette.neutral.section};
    div div {
      border-color: ${props => props.theme.palette.neutral.cardHover};
    }
  }

  ${mobileV} {
    :hover {
      background-color: transparent;
    }
  }
`;

const AccordionSummaryStyle = styled(AccordionSummary)`
  height: 100%;
  margin: 0;
  padding: 1rem 0.8rem;

  .Mui-expanded {
    margin: 0;
  }

  > div {
    margin: 0;

    ${mobileV} {
      display: flex;
      flex-direction: column;
    }
  }
`;
