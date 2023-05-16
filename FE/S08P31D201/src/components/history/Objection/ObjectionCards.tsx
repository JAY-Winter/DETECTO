import { mobileV } from '@/utils/Mixin';
import IssueItemBottom from '@components/RaiseIssue/IssueInfo/IssueItemBottom';
import IssueItemTop from '@components/RaiseIssue/IssueInfo/IssueItemTop';
import styled from '@emotion/styled';
import { KeyboardArrowDown } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Input,
  Paper,
  TextField,
} from '@mui/material';
import { IssueType } from 'IssueTypes';
import React from 'react';
import { TeamType } from 'ReportTypes';
import IssueImage from '../Issue/IssueImage';
import MemberCard from '../Issue/MemberCard';
import CardCollapse from './CardCollapse';

const ObjectionCard = ({ objectionIssue }: { objectionIssue: IssueType }) => {
  return (
    <IssueWrapper>
      <PaperStyle state={objectionIssue.status} elevation={3}>
        <AccordionStyle>
          <AccordionSummaryStyle
            expandIcon={<KeyboardArrowDown />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <IssueItemTop issue={objectionIssue} />
          </AccordionSummaryStyle>
          <AccordionDetails>
            <CardCollapse objectionIssue={objectionIssue} />
          </AccordionDetails>
        </AccordionStyle>
      </PaperStyle>
    </IssueWrapper>
  );
};

function ObjectionCards({ obList }: { obList: IssueType[] }) {
  if (obList.length === 0) {
    return <></>;
  }
  return (
    <>
      {obList.map(ob => (
        <ObjectionCard objectionIssue={ob} key={ob.id + ob.createdAt} />
      ))}
    </>
  );
}

export default ObjectionCards;

const IssueWrapper = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
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

const TextFieldStyle = styled(TextField)`
  width: 100%;
  margin-right: 0.5rem;

  label {
    font-size: 1rem;
  }

  input::placeholder {
    font-size: 1rem;
  }

  ${mobileV} {
    margin-right: 0;
  }
`;
