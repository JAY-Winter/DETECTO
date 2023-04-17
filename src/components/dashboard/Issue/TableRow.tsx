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

export type TteamMember = {
  memberId: number;
  memberImg: string;
  memberName: string;
  memberTeam: string;
};

export type TtableData = {
  date: string;
  issue: string[];
  work: string;
  team: number;
  violate_img: string;
  violate_member?: TteamMember;
  teamList: TteamMember[];
};

const nullMember: TteamMember = {
  memberId: 0,
  memberImg: "",
  memberName: "미지정",
  memberTeam: "팀 미지정"
}


const TableCollapseCard = ({
  violate_img,
  teamList,
  violate_member,
}: {
  violate_img: string;
  teamList: TteamMember[];
  violate_member?: TteamMember;
}) => {
  const [cardList, setCardList] = useState([nullMember, ...teamList])
  const [memberNum, setMemberNum] = useState(0)

  const switchMemeber = () => {
    setMemberNum(prev => {
      if (prev+1 < cardList.length) {
        return prev+1
      }
      else {
        return 0
      }
    })
  }

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
        <h2>위반 사진</h2>
        <img
          css={IssueImageStyle}
          src={violate_img}
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
          <img css={profileImageStyle} src={cardList[memberNum].memberImg} alt="" />
          <p>{cardList[memberNum].memberName} Pro</p>
          <p>{cardList[memberNum].memberTeam}</p>
          <IconButton className="leftArrow" onClick={switchMemeber}>
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton className="rightArrow" onClick={switchMemeber}>
            <KeyboardArrowRight />
          </IconButton>
        </ProfileCard>
        <Button variant="contained" sx={{ width: '100%', maxWidth: '350px' }}>
          위반사원 수정
        </Button>
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

const IssueImageStyle = css`
  width: 80%;
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
