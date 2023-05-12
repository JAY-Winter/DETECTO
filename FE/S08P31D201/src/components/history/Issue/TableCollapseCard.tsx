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
    <Box
      sx={{
        margin: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: 'fit-contents',
      }}
    >
      <div>
        <IssueImage reportid={reportid.toString()} />
      </div>
      <div>
        <MemberCard teamList={teamList} violate_member={violate_member} />
      </div>
      {/* <div
        style={{
          width: '50%',
        }}
      >
        <IssueWorkerImage reportid={reportid.toString()} />
      </div> */}
      <div>
        <h2>위치</h2>
        <h4>{area}번 카메라</h4>
        <IssueMap
          data={{
            id: reportid,
            area: area,
            x: x,
            y: y,
          }}
        />
      </div>
    </Box>
  );
}

export default TableCollapseCard;

const TableCollapseDiv = styled.div`
  display: flex;
  > div {
    flex-basis: 100%;
  }
`;
