import { useState } from 'react';

import styled from '@emotion/styled';
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
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
                안전사항 위반 날짜
                {sortField === 'Date' ? (
                  <IconButton
                    onClick={() => {
                      changeSortHandler('Date');
                    }}
                  >
                    {order === 'asc' ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      changeSortHandler('Date');
                    }}
                  >
                    <UnfoldMore />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="left">
                위반 사항
                {sortField === 'Equipment' ? (
                  <IconButton
                    onClick={() => {
                      changeSortHandler('Equipment');
                    }}
                  >
                    {order === 'asc' ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      changeSortHandler('Equipment');
                    }}
                  >
                    <UnfoldMore />
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="left">작업 사항</TableCell>
              <TableCell align="left">
                작업 조
                {sortField === 'Team' ? (
                  <IconButton
                    onClick={() => {
                      changeSortHandler('Team');
                    }}
                  >
                    {order === 'asc' ? (
                      <KeyboardArrowUp />
                    ) : (
                      <KeyboardArrowDown />
                    )}
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      changeSortHandler('Team');
                    }}
                  >
                    <UnfoldMore />
                  </IconButton>
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
