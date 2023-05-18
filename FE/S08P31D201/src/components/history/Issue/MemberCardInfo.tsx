import React from 'react';
import { css } from '@emotion/react';
import { KeyboardArrowDown } from '@mui/icons-material';
import { ReportUserType, TeamType } from 'ReportTypes';

type MemberCardInfoType = {
  member: ReportUserType;
  teamList: TeamType;
  isTop: boolean;
};

function MemberCardInfo({ member, teamList, isTop }: MemberCardInfoType) {
  console.log(member)

  return (
    <>
      <img css={profileImageStyle} src={member.image ? member.image : ""} alt="" />
      <div>
        <p>{member.name}</p>
        <p>{teamList.teamName}</p>
      </div>
      <span>{isTop && <KeyboardArrowDown />}</span>
    </>
  );
}

export default MemberCardInfo;

const profileImageStyle = css`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0px 0px 30px 0px rgba(6, 6, 6, 0.15);
`;
