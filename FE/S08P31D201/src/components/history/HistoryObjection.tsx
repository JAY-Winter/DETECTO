import styled from '@emotion/styled';
import axios from 'axios';
import { IssueType } from 'IssueTypes';
import React, { useEffect, useState } from 'react';
import ObjectionCards from './Objection/ObjectionCards';
import ObjectionFilter from './Objection/ObjectionFilter';

function HistoryObjection() {
  const [obFilter, setObFilter] = useState(['REJECTED', 'PENDING', 'APPLIED']);
  const [objectionList, setObjectionList] = useState<IssueType[]>([])

  const obFiltering = (obState: string[]) => {
    if (obState.length === 1) {
      if (obFilter.includes(obState[0])) {
        setObFilter(prev => prev.filter(x => x !== obState[0]))
      } else {
        setObFilter(prev => [...prev, obState[0]])
      }
    } else {
      setObFilter(obState)
    }
  };

  useEffect(() => { axios({ method: 'get', url: `https://k8d201.p.ssafy.io/api/objection` }).then(
    res => setObjectionList(res.data.data)
  );}, [])

  console.log(objectionList)

  return (
    <HistoryObjectionDiv>
      <ObjectionFilter obFilter={obFilter} setFilterOb={obFiltering} />
      <ObjectionCards obList={objectionList}/>
    </HistoryObjectionDiv>
  );
}

export default HistoryObjection;

const HistoryObjectionDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
`;
