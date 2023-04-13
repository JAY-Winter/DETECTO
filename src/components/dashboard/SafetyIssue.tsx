import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

function createData(date: string, issue: string, work: string, team: number) {
  return {
    date,
    issue,
    work,
    team,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <IssueTableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="right">{row.issue}</TableCell>
        <TableCell align="right">{row.work}</TableCell>
        <TableCell align="right">{row.team}</TableCell>
        <PendingTableCell align="center">
          {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </PendingTableCell>
      </IssueTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('2022-04-14 12:00', '안전모, 장갑', '현장작업', 1),
  createData('2022-04-14 14:00', '장갑', '현장작업', 1),
  createData('2022-04-14 18:30', '안전모', '현장작업', 2),
  createData('2022-04-14 19:23', '앞치마', '현장작업', 2),
  createData('2022-04-14 20:12', '보안경', '현장작업', 3),
];

function DashboardSafetyIssue() {
  return (
    <TableContainer component={Paper} css={IssueTableContainer}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>안전사항 위반 날짜</TableCell>
            <TableCell align="right">위반 사항</TableCell>
            <TableCell align="right">작업 사항</TableCell>
            <TableCell align="right">작업 조</TableCell>
            <PendingTableCell align="center" />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <Row key={row.date} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DashboardSafetyIssue;

const IssueTableContainer = css`
  width: 80vw;
`;

const PendingTableCell = styled(TableCell)`
  width: 1rem;
`;

const IssueTableRow = styled(TableRow)`
  &:hover {
    background-color: ${props => props.theme.palette.grey[10]}
  }
`