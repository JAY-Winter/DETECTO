import { useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, Card } from '@mui/material';
import { TteamMember } from '@/store/DashboardIssue';

const nullMember: TteamMember = {
  memberId: 0,
  memberImg: '',
  memberName: '미지정',
  memberTeam: '팀 미지정',
};

function MemberCard({
  teamList,
  violate_member,
}: {
  teamList: TteamMember[];
  violate_member?: TteamMember;
}) {
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
    <div
      style={{
        width: '100%',
        height: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>위반 사원</h2>
      <ProfileCard>
        <img
          css={profileImageStyle}
          src={cardList[memberNum].memberImg}
          alt=""
        />
        <p>{cardList[memberNum].memberName} Pro</p>
        <p>{cardList[memberNum].memberTeam}</p>
        <ArrowButton className="leftArrow" onClick={switchRightMemeber}>
          <KeyboardArrowLeft />
        </ArrowButton>
        <ArrowButton className="rightArrow" onClick={switchLeftMemeber}>
          <KeyboardArrowRight />
        </ArrowButton>
      </ProfileCard>
      <Button variant="contained" sx={{ width: '100%', maxWidth: '350px' }}>
        위반사원 수정
      </Button>
    </div>
  );
}

export default MemberCard;

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

const ArrowButton = styled(Button)`
  height: 100%;
`;
