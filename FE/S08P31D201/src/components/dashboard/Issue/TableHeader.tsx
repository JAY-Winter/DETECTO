import React from 'react';
import styled from '@emotion/styled';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  UnfoldMore,
} from '@mui/icons-material';
import useDashSort from '@/hooks/useDashSort';

function TableHeader() {
  const [sortField, order, changeSortHandler] = useDashSort();
  return (
    <TableHead>
      <TableRow>
        <TableCell>
          {sortField === 'Date' ? (
            <Button
              onClick={() => {
                changeSortHandler('Date');
              }}
              color="primary"
              variant="contained"
            >
              안전사항 위반 날짜
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
        <TableCell align="left">작업 사항</TableCell>
        <TableCell align="left">
          {sortField === 'Team' ? (
            <Button
              onClick={() => {
                changeSortHandler('Team');
              }}
              color="primary"
              variant="contained"
            >
              작업 조
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
  );
}

export default TableHeader;

const PendingTableCell = styled(TableCell)`
  width: 1rem;
`;
