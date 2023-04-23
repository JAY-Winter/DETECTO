import { useState } from 'react';

import styled from '@emotion/styled';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Button,
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  UnfoldMore,
} from '@mui/icons-material';
import { mobileV } from '@/utils/Mixin';
import IssueCard from './Issue/IssueCard';
import TablePaginationActions from './Issue/TablePaginationActions';
import Row from './Issue/TableRow';
import MobileSortButton from './Issue/MobileSortButton';
import { useRecoilValue } from 'recoil';
import useDashSort from '@/hooks/useDashSort';
import { DashboardIssue } from '@/store/DashboardIssue';

function DashboardSafetyIssue() {
  const data = useRecoilValue(DashboardIssue);
  const [sortField, order, changeSortHandler] = useDashSort();

  // Pagenation
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <IssueTableContainer>
        <Table stickyHeader aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                {sortField === 'Date' ? (
                  <Button
                    onClick={() => {
                      changeSortHandler('Date');
                    }}
                    color="primary"
                  >
                    안전사항 위반 날짜
                    {order === 'asc' ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      changeSortHandler('Date');
                    }}
                    color="inherit"
                  >
                    안전사항 위반 날짜
                    <UnfoldMore />
                  </Button>
                )}
              </TableCell>
              <TableCell align="left">
                {sortField === 'Equipment' ? (
                  <Button
                    onClick={() => {
                      changeSortHandler('Equipment');
                    }}
                  >
                    위반 사항
                    {order === 'asc' ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      changeSortHandler('Equipment');
                    }}
                    color="inherit"
                  >
                    위반 사항
                    <UnfoldMore />
                  </Button>
                )}
              </TableCell>
              <TableCell align="left">작업 사항</TableCell>
              <TableCell align="left">
                {sortField === 'Team' ? (
                  <Button
                    onClick={() => {
                      changeSortHandler('Team');
                    }}
                  >
                    작업 조
                    {order === 'asc' ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      changeSortHandler('Team');
                    }}
                    color="inherit"
                  >
                    작업 조
                    <UnfoldMore />
                  </Button>
                )}
              </TableCell>
              <PendingTableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
            ).map(row => (
              <Row key={row.date} row={row} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5]}
                colSpan={5}
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </IssueTableContainer>
      <IssueCardContainer>
        <MobileSortButton />
        {data.map(issue => {
          return <IssueCard {...issue} key={issue.date} />;
        })}
      </IssueCardContainer>
    </>
  );
}

export default DashboardSafetyIssue;

const IssueTableContainer = styled(Paper)`
  display: flex;
  width: 100%;
  transition: 0.2s ease all;

  ${mobileV} {
    display: none;
  }
`;

const IssueCardContainer = styled.div`
  display: none;
  width: 100%;
  ${mobileV} {
    display: flex;
    flex-direction: column;
  }
`;

const PendingTableCell = styled(TableCell)`
  width: 1rem;
`;
