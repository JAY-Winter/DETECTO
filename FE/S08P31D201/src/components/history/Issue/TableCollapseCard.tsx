import { useState } from 'react';
import styled from '@emotion/styled';
import MemberCard from './MemberCard';
import IssueImage from './IssueImage';
import { TeamType, ReportUserType } from 'ReportTypes';

function TableCollapseCard({
  x,
  y,
  reportid,
  area,
  teamList,
  violate_member,
}: {
  x: number;
  y: number;
  reportid: number;
  area: number;
  teamList: TeamType;
  violate_member?: ReportUserType;
}) {
  return (
    <TableCollapseDiv>
      <CollapseCardDiv>
        <IssueImage reportid={reportid.toString()} />
      </CollapseCardDiv>
      <CollapseCardDiv>
        <MemberCard teamList={teamList} violate_member={violate_member} />
      </CollapseCardDiv>
      {/* <div
        style={{
          width: '50%',
        }}
      >
        <IssueWorkerImage reportid={reportid.toString()} />
      </div> */}
    </TableCollapseDiv>
  );
}

export default TableCollapseCard;

const TableCollapseDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  padding: 1rem;
  background-color: ${props => props.theme.palette.neutral.cardHover};
  border-radius: 10px;
  margin: 0.4rem 0 1rem 0;

  > div {
    flex-basis: 50%;
  }
`;

// width를 일정 수치 안주면 resize가 정상작동을 하지 않습니다
const CollapseCardDiv = styled.div`
  width: 100px;
  padding-right: 1rem;
  &:nth-last-of-type(1) {
    padding-right: 0;
  }
`;
