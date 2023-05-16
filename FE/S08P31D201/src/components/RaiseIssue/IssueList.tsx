import React, { useEffect, useState } from 'react';
import useAxios from '@/hooks/useAxios';
import { AxiosResponse } from 'axios';
import { IssueType } from 'IssueTypes';
import styled from '@emotion/styled';
import IssueItem from './IssueInfo/IssueItem';

const DUMMY: IssueType[] = [
  {
    id: 7,
    createdDate: '2023-05-15T01:05:29.67679',
    reportItems: ['helmet', 'goggles'],
    team: { id: 1, teamName: '오전', users: [] },
    time: '2023-05-15T01:05:29.67679',
    cctvArea: 1,
    user: { id: 1001, name: '성광현', image: null },
    status: 'REJECTED',
    adminComment: 'ssssssssss',
    workerComment: 'aaaaaaaaaaaaaaaa',
  },
  {
    id: 7,
    createdDate: '2023-05-15T01:05:29.67679',
    reportItems: ['helmet', 'goggles'],
    team: { id: 1, teamName: '오전', users: [] },
    time: '2023-05-15T01:05:29.67679',
    cctvArea: 1,
    user: { id: 1001, name: '성광현', image: null },
    status: 'PENDING',
    workerComment: 'aaaaaaaaaaaaaaaa',
  },
  {
    id: 7,
    createdDate: '2023-05-15T01:05:29.67679',
    reportItems: ['helmet', 'goggles'],
    team: { id: 1, teamName: '오전', users: [] },
    time: '2023-05-15T01:05:29.67679',
    cctvArea: 1,
    user: { id: 1001, name: '성광현', image: null },
    status: 'APPLIED',
    adminComment: 'ssssssssss',
    workerComment: 'aaaaaaaaaaaaaaaa',
  },
];

function IssueList() {
  const [issueList, setIssueList] = useState<IssueType[]>(DUMMY);

  const getTryhandler = (response: AxiosResponse) => {
    setIssueList(response.data.data);
  };

  // TODO: list API
  const [data, isLoading, setRequestObj] = useAxios({
    tryHandler: getTryhandler,
    baseURL: 'https://k8d201.p.ssafy.io/api/',
  });

  //   useEffect(() => {
  //     setRequestObj({
  //       method: 'get',
  //       url: `??`,
  //     });
  //     console.log(issueList);
  //   }, [issueList]);

  return (
    <IssueContainer>
      {issueList ? (
        issueList.map((issue: IssueType, key: number) => {
          return <IssueItem issue={issue} key={key} />;
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
`;
