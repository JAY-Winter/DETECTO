import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { CardMedia, Switch, Button, css } from '@mui/material';
import React from 'react';
import { EquipmentType } from 'EquipmentTypes';

type EquipmentCardProps = {
  equipment: EquipmentType,
  onDelete: (willDeleteID: number) => void,
  onToggleAccessibility: (willToggleID: number) => void,
}


function EquipmentCard({ equipment, onDelete, onToggleAccessibility }: EquipmentCardProps) {
  return (
    <EqCard ischecked={equipment.isActive.toString()}>
      <CardHeaderDiv>
        <h2>{equipment.name}</h2>
        <Switch checked={equipment.isActive} onChange={() => onToggleAccessibility(equipment.id)} />
      </CardHeaderDiv>
      <img css={imageStyle} src={equipment.img} />
      <CardContentDiv>
        <div>{equipment.desc}</div>
        <Button onClick={() => onDelete(equipment.id)} color="error" variant="contained">
          삭제
        </Button>
      </CardContentDiv>
      <ProgressBarDiv>
        <ProgressBarSpan />
      </ProgressBarDiv>
      <ProgressContextDiv>학습 진행률: 60%</ProgressContextDiv>
    </EqCard>
  );
}

export default EquipmentCard;

const EqCard = styled.div<{ ischecked: string }>`
  width: 18rem;
  padding: 1rem;
  margin: 1rem;
  transition: 0.2s all ease;
  background-color: ${props => props.theme.palette.neutral.section};
  -webkit-filter: grayscale(${props => (props.ischecked === "true" ? 0 : 0.8)});
`;

const CardHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const imageStyle = css`
  width: 100%;
  height: 250px;
  object-fit: cover;
`

const CardContentDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
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

const ProgressContextDiv = styled.div`
  font-size: 0.8rem;
  color: ${props => props.theme.palette.text.secondary};
  margin-top: 5px;
`;
