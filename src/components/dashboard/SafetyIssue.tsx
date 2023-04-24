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
  Pagination,
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
import TableHeader from './Issue/TableHeader';

function DashboardSafetyIssue() {
  const data = useRecoilValue(DashboardIssue);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // mobile Pagination
  const [mobilePage, setMobliePage] = useState(1);
  const handleMobliePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setMobliePage(value);
  }

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
          <TableHeader />
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
        {data.slice(mobilePage * 5 - 5, mobilePage * 5).map(issue => {
          return <IssueCard {...issue} key={issue.date} />;
        })}
        <Pagination count={Math.ceil(data.length / 5)} page={mobilePage} onChange={handleMobliePage} />
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
    align-items: center;
  }
`;

const PendingTableCell = styled(TableCell)`
  width: 1rem;
`;
