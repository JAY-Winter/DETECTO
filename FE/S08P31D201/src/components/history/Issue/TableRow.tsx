import { useState } from 'react';
import styled from '@emotion/styled';
import { Collapse, TableCell, TableRow } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { ReportType } from 'ReportTypes';
import TableCollapseCard from './TableCollapseCard';

function Row(props: { row: ReportType }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const timeFormatter = (time: ReportType['time']) => {
    return new Date(time).toISOString().replace('T', ' ').slice(0, -5);
  };

  const itemFormatter = (reportItems: ReportType['reportItems']) => {
    const items = [...reportItems];
    const sortedItems = items.sort().join(', ');
    return sortedItems;
  };

  return (
    <>
      <IssueTableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {timeFormatter(row.time)}
        </TableCell>
        <TableCell align="left">{itemFormatter(row.reportItems)}</TableCell>
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
              reportid={row.id}
              area={row.cctvArea}
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

const IssueTableRow = styled(TableRow)`
  th,
  td {
    padding: 0.8rem 1rem;
  }

  tr {
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
