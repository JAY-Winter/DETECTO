import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  UnfoldMore,
} from '@mui/icons-material';
import useHistorySort from '@/hooks/useHistorySort';

function IssueTableHeader() {
  const [sortField, order, changeSortHandler] = useHistorySort();

  useEffect(() => {
    changeSortHandler('Date');
  }, []);

  return (
    <TableHead>
      <TableRow>
        <TableCell sx={{ width: '40%' }}>
          {sortField === 'Date' ? (
            <Button
              onClick={() => {
                changeSortHandler('Date');
              }}
              color="primary"
              variant="contained"
            >
              접수 날짜
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Button>
          ) : (
            <Button
              onClick={() => {
                changeSortHandler('Date');
              }}
              color="inherit"
            >
              접수 날짜
              <UnfoldMore />
            </Button>
          )}
        </TableCell>
        <TableCell align="left" sx={{ width: '35%' }}>
          {sortField === 'Equipment' ? (
            <Button
              onClick={() => {
                changeSortHandler('Equipment');
              }}
              color="primary"
              variant="contained"
            >
              위반 날짜
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Button>
          ) : (
            <Button
              onClick={() => {
                changeSortHandler('Equipment');
              }}
              color="inherit"
            >
              위반 날짜
              <UnfoldMore />
            </Button>
          )}
        </TableCell>
        <TableCell align="left" sx={{ width: '20%' }}>
          {sortField === 'Team' ? (
            <Button
              onClick={() => {
                changeSortHandler('Team');
              }}
              color="primary"
              variant="contained"
            >
              작성자
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Button>
          ) : (
            <Button
              onClick={() => {
                changeSortHandler('Team');
              }}
              color="inherit"
            >
              작성자
              <UnfoldMore />
            </Button>
          )}
        </TableCell>
        <PendingTableCell align="right" sx={{ width: '5%' }} />
      </TableRow>
    </TableHead>
  );
}

export default IssueTableHeader;

const PendingTableCell = styled(TableCell)`
  width: 1rem;
`;
