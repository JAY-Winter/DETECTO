import { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import {
  Box,
  Button,
  Card,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from '@mui/icons-material';
import { TtableData, TteamMember } from '@/store/DashboardIssue';
import MemberCard from './MemberCard';
import IssueImage from './IssueImage';

const nullMember: TteamMember = {
  memberId: 0,
  memberImg: '',
  memberName: '미지정',
  memberTeam: '팀 미지정',
};

const TableCollapseCard = ({
  violate_img,
  teamList,
  violate_member,
}: {
  violate_img: string;
  teamList: TteamMember[];
  violate_member?: TteamMember;
}) => {
  const [cardList, setCardList] = useState([nullMember, ...teamList]);
  const [memberNum, setMemberNum] = useState(0);

  const switchRightMemeber = () => {
    setMemberNum(prev => {
      if (prev - 1 >= 0) {
        return prev - 1;
      } else {
        return cardList.length - 1;
      }
    });
  };

  const switchLeftMemeber = () => {
    setMemberNum(prev => {
      if (prev + 1 < cardList.length) {
        return prev + 1;
      } else {
        return 0;
      }
    });
  };

  return (
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
        <IssueImage violate_img={violate_img} />
      </div>
      <div
        style={{
          width: '50%',
        }}
      >
        <MemberCard teamList={teamList} violate_member={violate_member} />
      </div>
    </Box>
  );
};

function Row(props: { row: TtableData }) {
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
        <TableCell align="left">{row.issue.toString()}</TableCell>
        <TableCell align="left">{row.work}</TableCell>
        <TableCell align="left">{row.team}</TableCell>
        <PendingTableCell align="center">
          {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </PendingTableCell>
      </IssueTableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TableCollapseCard
              violate_img={row.violate_img}
              violate_member={row.violate_member}
              teamList={row.teamList}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default Row;

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