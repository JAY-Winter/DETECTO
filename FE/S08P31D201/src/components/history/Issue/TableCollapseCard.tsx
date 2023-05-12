import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Collapse, TableCell, TableRow } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import MemberCard from './MemberCard';
import IssueImage from './IssueImage';
import ScatterChart from '@components/dashboard/Charts/ScatterChart';
import { ReportType, TeamType, ReportUserType } from 'ReportTypes';
import IssueMap from './IssueMap';
import IssueWorkerImage from './IssueWorkerImage';

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

  >div {
    flex-basis: 50%;
  }
`;

// width를 일정 수치 안주면 resize가 정상작동을 하지 않습니다
const CollapseCardDiv = styled.div`
  width: 100px;
`
