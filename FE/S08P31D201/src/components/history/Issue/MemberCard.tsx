import { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Card } from '@mui/material';
import { TeamType, ReportUserType } from 'ReportTypes';
import axios from 'axios';
import { mobileV } from '@/utils/Mixin';
import { useRecoilState } from 'recoil';
import { HistoryIssue } from '@/store/HistoryIssue';
import MemberCardInfo from './MemberCardInfo';

function MemberCard({
  reportId,
  teamList,
  violate_member,
}: {
  reportId: number;
  teamList: TeamType;
  violate_member: ReportUserType | undefined;
}) {
  const [cardList] = useState<ReportUserType[]>([...teamList.users]);
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
        .then(res =>
          setReport(prev => {
            const newList = prev.map(report => {
              if (report.id === reportId) {
                return { ...report, user: cardList[memberNum] };
              } else {
                return report;
              }
            });
            return newList;
          })
        )
        .catch(err => alert('알 수 없는 에러!'));
    }
  };

  return (
    <MemberCardDiv>
      <h2 style={{ marginBottom: '0.5rem' }}>위반 사원</h2>
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
        <MemberCardInfo
          member={cardList[memberNum]}
          teamList={teamList}
          isTop={true}
        />
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

      <Button
        variant="contained"
        sx={{ width: '100%', maxWidth: '350px', marginTop: '1rem' }}
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
    & > button {
      margin: 0 0 1rem 0;
    }
    & > h2 {
      width: 100%;
      font-size: 2rem;
      margin-left: 0.2rem;
    }
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

const ProfileCardNone = styled(Card)`
  background-color: ${props => props.theme.palette.neutral.card};
  padding: 0.5rem;
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
