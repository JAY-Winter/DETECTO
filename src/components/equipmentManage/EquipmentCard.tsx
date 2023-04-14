import { useState } from 'react';
import styled from '@emotion/styled';
import { Card, CardMedia, Switch, Button } from '@mui/material';
import React from 'react';


function EquipmentCard() {
  const [disabled, setDisabled] = useState<boolean>(true);

  const switchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisabled(e.currentTarget.checked);
  };

  return (
    <EqCard ischecked={disabled.toString()}>
      <CardHeaderDiv>
        <h2>안전모</h2>
        <Switch checked={disabled} onChange={switchHandler} />
      </CardHeaderDiv>
      <CardMedia
        component="img"
        height={'250'}
        title=""
        image="https://safe-s.co.kr/web/product/tiny/20200127/89baf7d3d3626b8a408b8397249d3a0c.jpg"
      />
      <CardContentDiv>
        <div>설명설명</div>
        <Button color="error" variant="contained">
          삭제
        </Button>
      </CardContentDiv>
      <ProgressBarDiv>
        <ProgressBarSpan />
      </ProgressBarDiv>
      <ProgressContextSpan>20XX-XX-XX 60% 학습진행중...</ProgressContextSpan>
    </EqCard>
  );
}

export default EquipmentCard;

const EqCard = styled(Card)<{ ischecked: string }>`
  width: 18rem;

  padding: 1rem;
  margin: 1rem;

  transition: 0.2s all ease;

  -webkit-filter: grayscale(${props => (props.ischecked === "true" ? 0 : 0.8)});
`;

const CardHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardContentDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const ProgressBarDiv = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${props => props.theme.palette.neutral.card};
  border-radius: 20px;
`;

const ProgressBarSpan = styled.div`
  width: 60%;
  height: 5px;
  background-color: ${props => props.theme.palette.primary.main};
  border-radius: 20px;
`;

const ProgressContextSpan = styled.span`
  font-size: 0.8rem;
  color: ${props => props.theme.palette.text.secondary};
`;
