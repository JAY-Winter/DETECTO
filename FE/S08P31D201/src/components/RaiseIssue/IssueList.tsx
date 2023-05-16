import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { AxiosResponse } from 'axios';
import { IssueType } from 'IssueTypes';
import styled from '@emotion/styled';
import IssueItem from './IssueInfo/IssueItem';
import { useRecoilValue } from 'recoil';
import { UserInfo } from '@/store/userInfoStroe';
import { mobileV } from '@/utils/Mixin';

function IssueList() {
  const userInfo = useRecoilValue(UserInfo);
  const [issueList, setIssueList] = useState<IssueType[]>();

  const removeItem = (id: number) => {
    console.log(id);
    setIssueList(prev => prev?.filter(issue => issue.id !== id));
  };

  const getTryhandler = (response: AxiosResponse) => {
    setIssueList(response.data.data);
  };

  const [data, isLoading, setRequestObj] = useAxios({
    tryHandler: getTryhandler,
    baseURL: 'https://k8d201.p.ssafy.io/api/',
  });

  useEffect(() => {
    setRequestObj({
      method: `get`,
      url: `objection/${userInfo.type === 'ADMIN' ? '' : userInfo.id}`,
    });
  }, []);

  return (
    <IssueContainer>
      {issueList && issueList.length > 0 ? (
        issueList.map((issue: IssueType, key: number) => {
          return <IssueItem issue={issue} removeItem={removeItem} key={key} />;
        })
      ) : (
        <div style={{ marginTop: '2rem' }}>이의제기 내역이 없습니다.</div>
      )}
    </IssueContainer>
  );
}

export default IssueList;

const IssueContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5rem;

  ${mobileV} {
    margin-bottom: 1rem;
  }
`;
