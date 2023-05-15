import { useState } from 'react';
import styled from '@emotion/styled';
import { Collapse, TableCell, TableRow } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { ReportType } from 'ReportTypes';
import TableCollapseCard from './TableCollapseCard';
import { stringListFormatter, timeFormatter } from '@/utils/Formatter';
import { useRecoilValue } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';
import WorkerTableCollapseCard from '@components/foul/WorkerTableCollapseCard';

function Row(props: { row: ReportType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const userInfo = useRecoilValue(UserInfo);

  return (
    <>
      <IssueTableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {timeFormatter(row.time)}
        </TableCell>
        <TableCell align="left">
          {stringListFormatter(row.reportItems)}
        </TableCell>
        <TableCell align="left">{row.team.teamName}팀</TableCell>
        <TableCell align="right" padding="checkbox">
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </TableCell>
      </IssueTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {userInfo.type === 'ADMIN' ? (
              <TableCollapseCard
                x={row.x}
                y={row.y}
                reportid={row.id}
                area={row.cctvArea}
                violate_member={row.user}
                teamList={row.team}
                report={row}
              />
            ) : (
              <WorkerTableCollapseCard reportid={row.id} report={row} />
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;

const IssueTableRow = styled(TableRow)`
  th,
  td {
    padding: 0.8rem 1rem;
    border: none;
  }

  @media (hover: hover) {
    &:hover {
      th,
      td {
        background-color: ${props => props.theme.palette.neutral.card};
      }
      cursor: pointer;
    }
  }
`;
