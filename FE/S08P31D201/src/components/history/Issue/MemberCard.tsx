import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import { TeamType, ReportUserType } from 'ReportTypes';
import axios from 'axios';
import { mobileV } from '@/utils/Mixin';
import { useRecoilState } from 'recoil';
import { HistoryIssue } from '@/store/HistoryIssue';

function MemberCard({
  reportId,
  teamList,
  violate_member,
}: {
  reportId: number;
  teamList: TeamType;
  violate_member: ReportUserType | undefined;
}) {
  const [cardList, setCardList] = useState<ReportUserType[]>([
    ...teamList.users,
  ]);
  const [memberNum, setMemberNum] = useState(
    violate_member && violate_member.id !== -1
      ? teamList.users.findIndex(i => i.id === violate_member.id)
      : 0
  );
  const [openArcodian, setOpenArcodian] = useState<boolean>(false);

  const [report, setReport] = useRecoilState(HistoryIssue);

  const chooseMemberHandler = (idx: number) => {
    setMemberNum(idx);
    setOpenArcodian(false);
  };

  const submitHandler = () => {
    const choose = window.confirm('정말 근로자를 새로 할당 하시겠습니까?');
    if (choose) {
      axios({
        method: 'put',
        url: 'https://detecto.kr/api/report',
        data: { reportId: reportId, userId: cardList[memberNum].id },
      })
        .then(res => setReport(prev => {
          const newList = prev.map(report => {
            if (report.id === reportId) {
              return {...report, user: cardList[memberNum]}
            } else {
              return report
            }
          })
          return newList
        }))
        .catch(err => alert('알 수 없는 에러!'));
    }
  };

  return (
    <MemberCardDiv>
      <h2 style={{ margin: '0.5rem 0 1rem 0' }}>위반 사원</h2>
      <ProfileCard
        onMouseEnter={() => {
          setOpenArcodian(true);
        }}
        onMouseLeave={() => {
          setOpenArcodian(false);
        }}
        onTouchEnd={() => {
          setOpenArcodian(true);
        }}
      >
        <img css={profileImageStyle} src={cardList[memberNum].image} alt="" />
        <div>
          <p>{cardList[memberNum].name}</p>
          <p>{teamList.teamName}팀</p>
        </div>
        <span>
          <KeyboardArrowDown />
        </span>
        <SelectWorker open={openArcodian}>
          {cardList.map((member, index) => {
            if (member.id === -1) {
              return null;
            }
            return (
              <ProfileCard onClick={() => chooseMemberHandler(index)}>
                <img css={profileImageStyle} src={member.image} alt="" />
                <div>
                  <p>{member.name}</p>
                  <p>{teamList.teamName}팀</p>
                </div>
                <span></span>
              </ProfileCard>
            );
          })}
        </SelectWorker>
      </ProfileCard>

      <Button
        variant="contained"
        sx={{ width: '100%', maxWidth: '350px' }}
        onClick={submitHandler}
      >
        위반사원 수정
      </Button>
    </MemberCardDiv>
  );
}

export default MemberCard;

const MemberCardDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ${mobileV} {
    height: fit-content;
  }
`;

const ProfileCard = styled(Card)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: visible;

  width: 100%;
  height: 8rem;
  max-width: 350px;

  background-color: ${props => props.theme.palette.neutral.card};

  padding: 20px;
  border-radius: 12px;
  margin-top: auto;
  margin-bottom: auto;

  ${mobileV} {
    margin-bottom: 1rem;
  }

  cursor: pointer;

  p {
    &:first-of-type {
      font-size: 1.3rem;
      font-weight: bold;
      margin: 10px 0px;
    }
  }
`;

const profileImageStyle = css`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 30px 0px rgba(6, 6, 6, 0.15);
`;

const SelectWorker = styled.div<{ open: boolean }>`
  position: absolute;
  top: 8rem;
  left: 0;
  height: ${props => (props.open ? '20rem' : 0)};
  width: 100%;
  overflow-y: scroll;

  background-color: ${props => props.theme.palette.neutral.cardHover};

  transition: height 0.2s ease;

  z-index: 999;

  > div {
    margin-top: 1rem;
    :hover {
      background-color: ${props => props.theme.palette.primary.main};
      color: ${props => props.theme.palette.primary.contrastText};
    }
  }
`;
