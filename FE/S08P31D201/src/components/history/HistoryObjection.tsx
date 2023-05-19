import styled from '@emotion/styled';
import axios from 'axios';
import { IssueType } from 'IssueTypes';
import React, { useEffect, useState } from 'react';
import ObjectionCards from './Objection/ObjectionCards';
import ObjectionFilter from './Objection/ObjectionFilter';
import { useRecoilState } from 'recoil';
import { ObjectionQuery } from '@/store/ObjectionQuery';

function HistoryObjection() {
  const [obFilter, setObFilter] = useState(['PENDING']);
  const [objectionList, setObjectionList] = useState<IssueType[]>([]);
  const [ObjectionQ, setObjectionQ] = useRecoilState(ObjectionQuery);

  const obFiltering = (obState: string[]) => {
    if (obState.length === 1) {
      if (obFilter.includes(obState[0])) {
        setObFilter(prev => prev.filter(x => x !== obState[0]));
      } else {
        setObFilter(prev => [...prev, obState[0]]);
      }
    } else {
      setObFilter(['PENDING']);
    }
  };

  useEffect(() => {
    if (!ObjectionQ.valid) return;
    axios({ method: 'get', url: `https://detecto.kr/api/objection` }).then(
      res =>
        setObjectionQ(prev => {
          return { valid: false, data: res.data.data };
        })
    );
  }, [ObjectionQ.valid]);

  return (
    <HistoryObjectionDiv>
      <ObjectionFilter obFilter={obFilter} setFilterOb={obFiltering} />
      <ObjectionCards
        obList={ObjectionQ.data.filter(obj => obFilter.includes(obj.status))}
      />
    </HistoryObjectionDiv>
  );
}

export default HistoryObjection;

const HistoryObjectionDiv = styled.div`
  width: 100%;
  margin-top: 1rem;
`;
