import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';
import { IssueType } from 'IssueTypes';
import React, { useEffect, useState } from 'react';
import IssueImage from '../Issue/IssueImage';
import { mobileV, tabletV } from '@/utils/Mixin';
import ObjectMember from './ObjectionMemeber';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { ObjectionQuery } from '@/store/ObjectionQuery';

function CardCollapse({ objectionIssue }: { objectionIssue: IssueType }) {
  const [currentUser, setCurrentUser] = useState<number>();
  const [message, setMessage] = useState<string>('');
  const setObjectionQ = useSetRecoilState(ObjectionQuery);
  const violateUser = objectionIssue.team.users.filter(
    user => user.name === objectionIssue.name
  );

  useEffect(() => {
    setCurrentUser(violateUser[0].id);
  }, []);

  const rejectHandler = () => {
    const reject = window.confirm('정말 이의를 거절 하시겠습니까?');
    if (reject) {
      axios({
        method: 'post',
        url: 'https://detecto.kr/api/objection/admin',
        data: { id: objectionIssue.id, status: 'REJECTED', comment: '' },
      })
        .then(res =>
          setObjectionQ(prev => {
            return { valid: true, data: [...prev.data] };
          })
        )
        .catch(err => console.log(err));
    }
  };

  const removeHandler = () => {
    const remove = window.confirm('정말 리포트를 삭제 하시겠습니까?');
    if (remove) {
      axios({
        method: 'delete',
        url: `https://detecto.kr/api/report/${objectionIssue.reportId}`,
      })
        .then(res =>
          setObjectionQ(prev => {
            return { valid: true, data: [...prev.data] };
          })
        )
        .catch(err => console.log(err));
    }
  };

  const applyHandler = () => {
    const apply = window.confirm('정말 이의를 수정 하시겠습니까?');
    if (apply) {
      axios({
        method: 'post',
        url: 'https://detecto.kr/api/objection/admin',
        data: {
          id: objectionIssue.id,
          status: 'APPLIED',
          comment: message,
          changeId: currentUser,
        },
      })
        .then(res =>
          setObjectionQ(prev => {
            return { valid: true, data: [...prev.data] };
          })
        )
        .catch(err => console.log(err));
    }
  };

  const inputHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMessage(event.currentTarget.value);
  };

  const setUserIdHandler = (id: number) => {
    setCurrentUser(id);
  };

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
      {objectionIssue.status === 'PENDING' && (
        <>
          <TextFieldStyle
            label="승낙 및 거절 사유"
            placeholder="근로자에게 전송할 메시지를 입력해주세요."
            variant="filled"
            onChange={inputHandler}
            // onKeyDown={keyDownHandler}
          />
          <ButtonDiv>
            <Button
              color="error"
              variant="contained"
              onClick={rejectHandler}
              disabled={objectionIssue.status !== 'PENDING'}
            >
              이의 거절
            </Button>
            <Button
              variant="contained"
              onClick={applyHandler}
              disabled={
                violateUser[0].id === currentUser ||
                objectionIssue.status !== 'PENDING'
              }
            >
              이의 승낙 및 근로자 재할당
            </Button>
          </ButtonDiv>
        </>
      )}
      <ButtonWrapper>
        <Button onClick={removeHandler}>위반 내역 삭제</Button>
      </ButtonWrapper>
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
  margin-top: 2rem;

  label {
    font-size: 1rem;
  }

  input::placeholder {
    font-size: 1rem;
  }

  ${mobileV} {
    margin: 0;
    margin-bottom: 1rem;
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1.3rem 0.5rem 0.5rem 0;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: flex-end;

  button {
    margin-right: 1rem;
  }

  ${mobileV} {
    button {
      margin-right: 0;
      margin-left: 0.5rem;
      font-size: 0.8rem;
    }
  }
`;
