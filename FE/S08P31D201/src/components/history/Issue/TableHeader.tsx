import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  UnfoldMore,
} from '@mui/icons-material';
import useHistorySort from '@/hooks/useHistorySort';

function TableHeader() {
  const [sortField, order, changeSortHandler] = useHistorySort();

  return (
    <TableHead>
      <TableRow>
        <TableCell align="left" sx={{ width: '20%' }}>
          {sortField === 'Team' ? (
            <Button
              onClick={() => {
                changeSortHandler('Team');
              }}
              color="primary"
              variant="contained"
            >
              위반자명
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Button>
          ) : (
            <Button
              onClick={() => {
                changeSortHandler('Team');
              }}
              color="inherit"
            >
              위반자명
              <UnfoldMore />
            </Button>
          )}
        </TableCell>
        <TableCell align="left" sx={{ width: '40%' }}>
          {sortField === 'Equipment' ? (
            <Button
              onClick={() => {
                changeSortHandler('Equipment');
              }}
              color="primary"
              variant="contained"
            >
              위반 사항
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
        <TableCell sx={{ width: '35%' }}>
          {sortField === 'Date' ? (
            <Button
              onClick={() => {
                changeSortHandler('Date');
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
                changeSortHandler('Date');
              }}
              color="inherit"
            >
              위반 날짜
              <UnfoldMore />
            </Button>
          )}
        </TableCell>
        <PendingTableCell align="right" sx={{ width: '5%' }} />
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;

const PendingTableCell = styled(TableCell)`
  width: 1rem;
`;
