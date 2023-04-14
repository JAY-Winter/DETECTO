import { useState } from 'react';
import { useTheme } from '@mui/material/styles';

import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  Box,
  Button,
  Collapse,
  IconButton,
  Card,
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
  KeyboardArrowLeft,
  KeyboardArrowRight,
  FirstPage,
  LastPage,
} from '@mui/icons-material';
import Albert from '@/assets/img/albert.jpg';
import { mobileV } from '@/utils/Mixin';
import IssueCard from './Issue/IssueCard';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPage /> : <FirstPage />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPage /> : <LastPage />}
      </IconButton>
    </Box>
  );
}

function createData(date: string, issue: string, work: string, team: number) {
  return {
    date,
    issue,
    work,
    team,
    history: [],
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <IssueTableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="left">{row.issue}</TableCell>
        <TableCell align="left">{row.work}</TableCell>
        <TableCell align="left">{row.team}</TableCell>
        <PendingTableCell align="center">
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </PendingTableCell>
      </IssueTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              sx={{
                margin: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '50%',
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h2>위반 사진</h2>
                <img
                  css={IssueImageStyle}
                  src="https://image.ytn.co.kr/general/jpg/2018/0725/201807250840324192_t.jpg"
                  alt=""
                />
              </div>
              <div
                style={{
                  width: '50%',
                  height: '300px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <h2>위반 사원</h2>
                <ProfileCard>
                  <img css={profileImageStyle} src={Albert} alt="" />
                  <p>{'아인슈타인'} Pro</p>
                  <p>{'삼성전기 안전관리1팀'}</p>
                  <IconButton className="leftArrow">
                    <KeyboardArrowLeft />
                  </IconButton>
                  <IconButton className="rightArrow">
                    <KeyboardArrowRight />
                  </IconButton>
                </ProfileCard>
                <Button
                  variant="contained"
                  sx={{ width: '100%', maxWidth: '350px' }}
                >
                  위반사원 수정
                </Button>
              </div>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const rows = [
  createData('2022-04-14 12:00', '안전모, 장갑', '현장작업', 1),
  createData('2022-04-14 14:00', '장갑', '현장작업', 1),
  createData('2022-04-14 18:30', '안전모', '현장작업', 2),
  createData('2022-04-14 19:23', '앞치마', '현장작업', 2),
  createData('2022-04-14 20:12', '보안경', '현장작업', 3),
  createData('2022-04-14 20:13', '보안경', '현장작업', 3),
  createData('2022-04-14 20:14', '보안경', '현장작업', 2),
  createData('2022-04-14 20:15', '보안경', '현장작업', 1),
  createData('2022-04-14 20:16', '보안경', '현장작업', 2),
  createData('2022-04-14 20:17', '보안경', '현장작업', 3),
  createData('2022-04-14 20:18', '보안경', '현장작업', 4),
  createData('2022-04-14 20:19', '보안경', '현장작업', 4),
  createData('2022-04-14 20:20', '보안경', '현장작업', 4),
].sort();

function DashboardSafetyIssue() {
  const [order, setOrder] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
                <IconButton
                  onClick={() => {
                    setOrder(prev => !prev);
                  }}
                >
                  {order ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
              <TableCell align="left">
                위반 사항
                <IconButton
                  onClick={() => {
                    setOrder(prev => !prev);
                  }}
                >
                  {order ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
              <TableCell align="left">
                작업 사항
                <IconButton
                  onClick={() => {
                    setOrder(prev => !prev);
                  }}
                >
                  {order ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
              <TableCell align="left">
                작업 조
                <IconButton
                  onClick={() => {
                    setOrder(prev => !prev);
                  }}
                >
                  {order ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                </IconButton>
              </TableCell>
              <PendingTableCell align="center" />
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
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
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={5}
                count={rows.length}
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

        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
        <IssueCard />
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

const IssueTableRow = styled(TableRow)`
  @media (hover: hover) {
    &:hover {
      background-color: ${props => props.theme.palette.neutral.card};
    }
  }
`;

const IssueImageStyle = css`
  width: 100%;
  height: calc(100% - 34px);
  object-fit: cover;
  border-radius: 10px;
`;

const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 350px;
  background-color: ${props => props.theme.palette.neutral.card};
  padding: 20px;
  p {
    &:first-of-type {
      font-size: 1.3rem;
      font-weight: bold;
      margin: 10px 0px;
    }
  }

  .leftArrow {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
  }

  .rightArrow {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
  }
`;

const profileImageStyle = css`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.15);
`;
