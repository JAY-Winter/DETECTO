import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { IssueType } from 'IssueTypes';
import React from 'react';
import IssueImage from '../Issue/IssueImage';
import MemberCard from '../Issue/MemberCard';

function CardCollapse({ objectionIssue }: { objectionIssue: IssueType }) {
  const violateUser = objectionIssue.team.users.filter(
    user => user.name === objectionIssue.name
  );

  return (
    <div>
      <IssueImage reportid={objectionIssue.reportId.toString()} />
      <MemberCard
        reportId={objectionIssue.reportId}
        teamList={objectionIssue.team}
        violate_member={violateUser[0]}
      />
      <TextFieldStyle
        label="이의 제기 메시지"
        placeholder="근로자에게 전송할 메시지를 입력해주세요."
        variant="filled"
        // onChange={inputHandler}
        // onKeyDown={keyDownHandler}
      />
      <Button color="error" variant="contained">
        이의 거절
      </Button>
      <Button color="secondary" variant="contained">
        리포트 삭제
      </Button>
      <Button color="success" variant="contained" disabled>
        이의 승낙 및 근로자 재할당
      </Button>
    </div>
  );
}

export default CardCollapse;


const TextFieldStyle = styled(TextField)`
  width: 100%;
  margin-right: 0.5rem;

  label {
    font-size: 1rem;
  }

  input::placeholder {
    font-size: 1rem;
  }

  ${mobileV} {
    margin-right: 0;
  }
`;
