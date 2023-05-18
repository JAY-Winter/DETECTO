import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableFooter,
  TablePagination,
  Pagination,
} from '@mui/material';
import { mobileV } from '@/utils/Mixin';
import IssueCard from './Issue/IssueCard';
import TablePaginationActions from './Issue/TablePaginationActions';
import Row from './Issue/TableRow';
import MobileSortButton from './Issue/MobileSortButton';
import { useRecoilState, useRecoilValue } from 'recoil';
import { HistoryIssue } from '@/store/HistoryIssue';
import TableHeader from './Issue/TableHeader';
import { HistoryDayAtom, HistoryEqAtom } from '@/store/HistoryFilter';
import useAxios from '@/hooks/useAxios';
import { AxiosResponse } from 'axios';
import useHistorySort from '@/hooks/useHistorySort';
import { ReportType } from 'ReportTypes';
import { UserInfo } from '@/store/userInfoStroe';

function HistorySafetyIssue({
  pageElNum,
  tabState,
}: {
  pageElNum: number;
  tabState: number;
}) {
  const userInfo = useRecoilValue(UserInfo);
  const [reportData, setReportData] = useRecoilState(HistoryIssue);
  const historyDate = useRecoilValue(HistoryDayAtom);
  const historyEq = useRecoilValue(HistoryEqAtom);

  const historyTryhandler = (response: AxiosResponse) => {
    const sortData = response.data.data.sort((a: ReportType, b: ReportType) => {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
    setReportData(sortData);
  };

  const [sortField, order, changeSortHandler] = useHistorySort();

  const [data, isLoading, setRequestObj] = useAxios({
    tryHandler: historyTryhandler,
    baseURL: 'https://detecto.kr/api/',
  });

  useEffect(() => {
    const startDate = historyDate.startDay.toISOString().slice(0, 10);
    const endDate = historyDate.endDay.toISOString().slice(0, 10);
    const eq = historyEq.toString();
    
    let url = '';
    if (tabState === 0) {
      url = `report?startDate=${startDate}&endDate=${endDate}&equipments=${eq}`;
    } else if (tabState === 1) {
      url = `report?id=-1`;
    }

    if (userInfo.type === 'WORKER') {
      url += `&id=${userInfo.id}`;
    }
    setRequestObj({
      method: 'get',
      url: url,
    });
  }, [historyDate, historyEq]);

  // 페이지네이션 state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageElNum);

  // 모바일 페이지네이션 state
  const [mobilePage, setMobliePage] = useState(1);
  const handleMobliePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setMobliePage(value);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - reportData.length) : 0;

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

  const defaultLabelDisplayedRows = ({
    from,
    to,
    count,
  }: {
    from: number;
    to: number;
    count: number;
  }) => {
    return `현재 페이지: ${from} – ${to} /  전체 개수: ${
      count !== -1 ? count : `more than ${to}`
    }`;
  };

  // 페이지 초기화
  useEffect(() => {
    setPage(0)
    setMobliePage(1)
  }, [reportData])

  return (
    <>
      <IssueTableContainer elevation={1}>
        <Table stickyHeader aria-label="collapsible table">
          <TableHeader />
          <TableBody>
            {(rowsPerPage > 0
              ? reportData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : reportData
            ).map(row => (
              <Row key={row.id} row={row} />
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={4} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                labelRowsPerPage="페이지별 행 수:"
                labelDisplayedRows={() =>
                  defaultLabelDisplayedRows({
                    from: page * rowsPerPage + 1,
                    to: (page + 1) * rowsPerPage,
                    count: reportData.length,
                  })
                }
                colSpan={4}
                count={reportData.length}
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
        <MobileSortDiv>
          <MobileSortButton />
        </MobileSortDiv>
        {reportData.slice(mobilePage * 5 - 5, mobilePage * 5).map(issue => {
          return <IssueCard {...issue} key={issue.id} />;
        })}
        <Pagination
          count={Math.ceil(reportData.length / 5)}
          page={mobilePage}
          onChange={handleMobliePage}
        />
      </IssueCardContainer>
    </>
  );
}

export default HistorySafetyIssue;

const IssueTableContainer = styled(Paper)`
  display: flex;
  width: 100%;
  transition: 0.2s ease all;
  background-color: ${props => props.theme.palette.neutral.section};
  thead,
  tr,
  th {
    background-color: ${props => props.theme.palette.neutral.section};
  }

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
    nav {
      min-width: 22rem;
    }
  }
`;

const MobileSortDiv = styled.div`
  display: flex;

  width: 100%;
  justify-content: end;
`;
