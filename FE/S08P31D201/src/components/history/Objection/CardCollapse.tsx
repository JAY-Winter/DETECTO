import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { IssueType } from 'IssueTypes';
import React, { useEffect, useState } from 'react';
import IssueImage from '../Issue/IssueImage';
import { mobileV, tabletV } from '@/utils/Mixin';
import ObjectMember from './ObjectionMemeber';
import axios from 'axios';

function CardCollapse({ objectionIssue }: { objectionIssue: IssueType }) {
  const [currentUser, setCurrentUser] = useState<number>()
  const [message, setMessage] = useState<string>("")
  const violateUser = objectionIssue.team.users.filter(
    user => user.name === objectionIssue.name
  );

  useEffect(() => {
    setCurrentUser(violateUser[0].id)
  }, [])

  const rejectHandler = () => {
    const reject = window.confirm("정말 이의를 거절 하시겠습니까?")
    if (reject) {
      console.log('거절 눌렸습니다!');
      axios({
        method: 'post',
        url: "https://k8d201.p.ssafy.io/api/objection",
        data: {id: objectionIssue.id, status: "REJECTED"}
      }).then(res => console.log(res)).catch(err => console.log(err))
    }
  }

  const removeHandler = () => {
    const remove = window.confirm("정말 리포트를 삭제 하시겠습니까?")
    if (remove) {
      console.log('삭제 눌렸습니다!');
    }
  }

  const applyHandler = () => {
    const apply = window.confirm("정말 이의를 수정 하시겠습니까?")
    if (apply) {
      console.log('수정 눌렸습니다!');
      axios({
        method: 'post',
        url: "https://k8d201.p.ssafy.io/api/objection",
        data: {id: objectionIssue.id, status: "APPLIED", comment: message, changeId: currentUser}
      }).then(res => console.log(res)).catch(err => console.log(err))
    }
  }

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setMessage(event.currentTarget.value)
  }

  const setUserIdHandler = (id: number) => {
    setCurrentUser(id)
  }

  return (
    <CardCollapseDiv>
      <ObjectImgMemberDiv>
        <IssueImage reportid={objectionIssue.reportId.toString()} />
        <ObjectMember
          teamList={objectionIssue.team}
          violate_member={violateUser[0]}
          setUserId={setUserIdHandler}
        />
      </ObjectImgMemberDiv>
      <TextFieldStyle
        label="이의 메시지"
        placeholder="근로자에게 전송할 메시지를 입력해주세요."
        variant="filled"
        onChange={inputHandler}
        // onKeyDown={keyDownHandler}
      />
      <ButtonDiv>
        <Button color="error" variant="contained" onClick={rejectHandler}>
          이의 거절
        </Button>
        <Button color="secondary" variant="contained" onClick={removeHandler}>
          리포트 삭제
        </Button>
        <Button color="success" variant="contained" onClick={applyHandler} disabled={violateUser[0].id === currentUser}>
          이의 승낙 및 근로자 재할당
        </Button>
      </ButtonDiv>
    </CardCollapseDiv>
  );
}

export default CardCollapse;

const CardCollapseDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextFieldStyle = styled(TextField)`
  margin: 1rem;

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

const ObjectImgMemberDiv = styled.div`
  display: flex;
  flex-direction: row;

  margin-bottom: 1rem;

  ${tabletV} {
    flex-direction: column;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  
  button {
    flex-basis: 33%;

    margin: 1rem;
  }

  ${tabletV} {
    flex-direction: column;

    button {
      flex-direction: 100%;
    }
  }
`