import { useState } from 'react';
import styled from '@emotion/styled';
import { Box, Collapse, TableCell, TableRow } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import MemberCard from './MemberCard';
import IssueImage from './IssueImage';
import ScatterChart from '@components/dashboard/Charts/ScatterChart';
import { ReportType, TeamType, ReportUserType } from 'ReportTypes';
import IssueMap from './IssueMap';

const TableCollapseCard = ({
  x,
  y,
  violate_img,
  teamList,
  violate_member,
}: {
  x: number;
  y: number;
  violate_img: string;
  teamList: TeamType;
  violate_member?: ReportUserType;
}) => {
  return (
    <Box
      sx={{
        margin: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '50%',
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <IssueImage violate_img={violate_img} />
      </div>
      <div
        style={{
          width: '50%',
        }}
      >
        <MemberCard teamList={teamList} violate_member={violate_member} />
      </div>
      <div
        style={{
          width: '50%',
        }}
      >
        <h2>위치</h2> 
        <IssueMap
          data={{
            x: x,
            y: y,
          }}
        />
      </div>
    </Box>
  );
};

function Row(props: { row: ReportType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <IssueTableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {row.time}
        </TableCell>
        <TableCell align="left">{row.reportItems.toString()}</TableCell>
        <TableCell align="left">{row.team.teamName}팀</TableCell>
        <TableCell align="right" padding="checkbox">
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </TableCell>
      </IssueTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableCollapseCard
              x={row.x}
              y={row.y}
              violate_img={'나중에  S3로 바꿔야함'}
              violate_member={row.user}
              teamList={row.team}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;

const PendingTableCell = styled(TableCell)`
  width: 1rem;
`;

const IssueTableRow = styled(TableRow)`
  @media (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.palette.neutral.card};
    }
  }
`;
