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
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';
import { mobileV } from '@/utils/Mixin';
import IssueCard from './Issue/IssueCard';
import TablePaginationActions from './Issue/TablePaginationActions';
import Row, { TteamMember, TtableData } from './Issue/TableRow';

const team1: TteamMember[] = [
  {
    memberId: 1,
    memberImg: '',
    memberName: '성광현',
    memberTeam: '삼성전기 1팀',
  },
  {
    memberId: 2,
    memberImg: '',
    memberName: '윤소현',
    memberTeam: '삼성전기 1팀',
  },
];

const team2: TteamMember[] = [
  {
    memberId: 3,
    memberImg: '',
    memberName: '정재현',
    memberTeam: '삼성전기 2팀',
  },
  {
    memberId: 4,
    memberImg: '',
    memberName: '이석원',
    memberTeam: '삼성전기 2팀',
  },
];

const team3: TteamMember[] = [
  {
    memberId: 5,
    memberImg: '',
    memberName: '이용훈',
    memberTeam: '삼성전기 3팀',
  },
  {
    memberId: 6,
    memberImg: '',
    memberName: '배상준',
    memberTeam: '삼성전기 3팀',
  },
];

const team4: TteamMember[] = [
  {
    memberId: 7,
    memberImg: '',
    memberName: '아인슈타인',
    memberTeam: '삼성전기 4팀',
  },
  {
    memberId: 8,
    memberImg: '',
    memberName: '테슬라',
    memberTeam: '삼성전기 4팀',
  },
];

const dummyData: TtableData[] = [
  {
    date: '2023-04-10 11:00',
    issue: ['안전모'],
    work: '어떤작업',
    team: 1,
    violate_img:
      'https://www.enewstoday.co.kr/news/photo/202204/1566109_621853_1110.jpg',
    teamList: team1,
  },
  {
    date: '2023-04-10 11:30',
    issue: ['안전모', '앞치마'],
    work: '어떤작업',
    team: 1,
    violate_img:
      'https://www.enewstoday.co.kr/news/photo/202204/1566109_621853_1110.jpg',
    teamList: team1,
  },
  {
    date: '2023-04-10 13:58',
    issue: ['보안경'],
    work: '어떤작업',
    team: 1,
    violate_img:
      'https://www.safety.or.kr/resources/safety/img/business/top/st2.jpg',
    teamList: team1,
  },
  {
    date: '2023-04-10 14:10',
    issue: ['안전모'],
    work: '어떤작업',
    team: 2,
    violate_img:
      'https://www.safety.or.kr/resources/safety/img/business/top/st2.jpg',
    teamList: team2,
  },
  {
    date: '2023-04-10 20:13',
    issue: ['안전모', '장갑'],
    work: '어떤작업',
    team: 2,
    violate_img: 'https://www.m-i.kr/news/photo/202109/859719_629831_4819.jpg',
    teamList: team2,
  },
  {
    date: '2023-04-10 23:10',
    issue: ['보안경'],
    work: '어떤작업',
    team: 3,
    violate_img: 'https://www.m-i.kr/news/photo/202109/859719_629831_4819.jpg',
    teamList: team3,
  },
  {
    date: '2023-04-10 23:20',
    issue: ['보안경'],
    work: '어떤작업',
    team: 3,
    violate_img: 'https://www.m-i.kr/news/photo/202109/859719_629831_4819.jpg',
    teamList: team3,
  },
  {
    date: '2023-04-11 05:59',
    issue: ['앞치마'],
    work: '어떤작업',
    team: 3,
    violate_img:
      'https://www.hyundai.co.kr/image/upload/asset_library/MDA00000000000028577/4eabac6ba112474586415825282bff2f.jpg',
    teamList: team3,
  },
  {
    date: '2023-04-11 09:00',
    issue: ['팔토시', '앞치마'],
    work: '어떤작업',
    team: 4,
    violate_img:
      'https://www.hyundai.co.kr/image/upload/asset_library/MDA00000000000028577/4eabac6ba112474586415825282bff2f.jpg',
    teamList: team4,
  },
  {
    date: '2023-04-11 10:30',
    issue: ['팔토시', '안전모'],
    work: '어떤작업',
    team: 4,
    violate_img:
      'https://cdn.kmecnews.co.kr/news/photo/202102/9041_4805_3325.jpg',
    teamList: team4,
  },
  {
    date: '2023-04-11 11:20',
    issue: ['방진마스크', '보안경'],
    work: '어떤작업',
    team: 4,
    violate_img:
      'https://cdn.kmecnews.co.kr/news/photo/202102/9041_4805_3325.jpg',
    teamList: team4,
  },
];

function DashboardSafetyIssue() {
  const [data, setData] = useState<TtableData[]>(dummyData);

  const [order, setOrder] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dummyData.length) : 0;

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

  const ordering = () => {
    setData(prev => {
      if (order) {
        prev.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      } else {
        prev.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      }
      return prev;
    });
    setPage(0)
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
                    ordering();
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
              <TableCell align="left">작업 사항</TableCell>
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
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
