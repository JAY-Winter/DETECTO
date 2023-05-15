import { useState } from 'react';
import styled from '@emotion/styled';
import { TeamType, ReportUserType, ReportType } from 'ReportTypes';
import RaiseIssueButton from '@components/RaiseIssue/RaiseIssueButton';
import IssueDetail from '@components/RaiseIssue/IssueDetail';
import WorkerIssueImage from './WorkerIssueImage';

type TableCollapseCardPropsType = {
  reportid: number;
  teamList: TeamType;
  violate_member?: ReportUserType;
  report: ReportType;
};

function WorkerTableCollapseCard({
  reportid,
  teamList,
  violate_member,
  report,
}: TableCollapseCardPropsType) {
  return (
    <Container>
      <TableCollapseDiv>
        <TableLineWrapper>
          <CollapseCardDiv>
            <WorkerIssueImage reportid={reportid.toString()} />
          </CollapseCardDiv>
          <CollapseCardDiv>
            <IssueDetail report={report} />
          </CollapseCardDiv>
        </TableLineWrapper>
        <TableLineWrapper>
          <RaiseIssueButton report={report} />
        </TableLineWrapper>
      </TableCollapseDiv>
    </Container>
  );
}

export default WorkerTableCollapseCard;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const TableCollapseDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  padding: 1.5rem;
  background-color: ${props => props.theme.palette.neutral.cardHover};
  border-radius: 10px;
  margin: 0.4rem 0 1rem 0;
  max-width: 70rem;
`;

const TableLineWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CollapseCardDiv = styled.div`
  flex-basis: 40%;
  padding-right: 1rem;
  &:nth-last-of-type(1) {
    flex-basis: 60%;
    padding-right: 0;
  }
`;
