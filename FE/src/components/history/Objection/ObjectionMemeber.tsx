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
import MemberCardInfo from '../Issue/MemberCardInfo';

function ObjectMember({
  teamList,
  violate_member,
  setUserId,
}: {
  teamList: TeamType;
  violate_member: ReportUserType | undefined;
  setUserId: (id: number) => void;
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

  const chooseMemberHandler = (idx: number) => {
    setMemberNum(idx);
    setUserId(cardList[idx].id);
    setOpenArcodian(false);
  };

  return (
    <MemberCardDiv>
      <IssueImageTitle>위반 사원</IssueImageTitle>
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
          <p>{teamList.teamName}</p>
        </div>
        <span>
          <KeyboardArrowDown />
        </span>
        {openArcodian && (
          <SelectWorkerWrapper open={openArcodian}>
            {cardList.filter((card: ReportUserType) => card.type === 'ADMIN')
              .length !== cardList.length ? (
              <SelectWorker>
                {cardList.map((member: ReportUserType, index: number) => {
                  return (
                    member.type !== 'ADMIN' && (
                      <ProfileCard
                        onClick={() => chooseMemberHandler(index)}
                        key={index}
                      >
                        <MemberCardInfo
                          member={member}
                          teamList={teamList}
                          isTop={false}
                        />
                      </ProfileCard>
                    )
                  );
                })}
              </SelectWorker>
            ) : (
              <ProfileCardNone>
                팀 내에 다른 사원이 존재하지 않습니다.
              </ProfileCardNone>
            )}
          </SelectWorkerWrapper>
        )}
      </ProfileCard>
    </MemberCardDiv>
  );
}

export default ObjectMember;

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

const IssueImageTitle = styled('h2')`
  margin: 1.3rem 0 0.8rem 0;

  ${mobileV} {
    width: 100%;
    font-size: 2rem;
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

const SelectWorkerWrapper = styled.div<{ open: boolean }>`
  position: absolute;
  top: 8rem;
  left: 0;
  height: fit-content;
  width: 100%;
  padding-top: 0.3rem;
  margin-top: 0.1rem;
  transition: height 0.2s ease;
  overflow-y: auto;
  z-index: 999;
  border-radius: 10px;
  background-color: ${props => props.theme.palette.neutral.main};

  ::-webkit-scrollbar {
    width: 6px; /* 스크롤바의 너비 */
  }

  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: ${props =>
      props.theme.palette.primary.main}; /* 스크롤바의 색상 */
    border-radius: 10px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(33, 122, 244, 0.1); /*스크롤바 뒷 배경 색상*/
  }
`;

const SelectWorker = styled.div`
  background-color: ${props => props.theme.palette.neutral.cardHover};
  border: 1px solid ${props => props.theme.palette.neutral.card};
  border-radius: 10px;
  padding: 0.3rem;
  overflow-y: auto;

  > div {
    margin: 0.2rem 0;
    :hover {
      background-color: ${props => props.theme.palette.primary.main};
      color: ${props => props.theme.palette.primary.contrastText};
    }
  }
`;

const ProfileCardNone = styled(Card)`
  background-color: ${props => props.theme.palette.neutral.card};
  padding: 0.5rem;
`;
