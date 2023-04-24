import React from 'react';
import styled from '@emotion/styled';
import { IconButton, TableCell, TableHead, TableRow } from '@mui/material';
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
          안전사항 위반 날짜
          {sortField === 'Date' ? (
            <IconButton
              onClick={() => {
                changeSortHandler('Date');
              }}
            >
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
              {order === 'asc' ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
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
  );
}

export default TableHeader;

const PendingTableCell = styled(TableCell)`
  width: 1rem;
`;
