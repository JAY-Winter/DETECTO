import styled from '@emotion/styled';
import { Card } from '@mui/material';
import { useState } from 'react';

import {
  SpaceDashboard,
  VideoCameraFrontOutlined,
  Groups,
  CalendarMonth,
  Engineering,
} from '@mui/icons-material';

function SummaryPage() {
  return (
    <SummaryContainer>
      <SummaryHeader>
        <Card>
          <SpaceDashboard />
        </Card>
        <h1>대시보드</h1>
      </SummaryHeader>
      <SummaryContent>
        <TeamCard>
          <Groups />
        </TeamCard>
        <EquipmentCard>
          <Engineering />
        </EquipmentCard>
        <CCTVCard>
          <VideoCameraFrontOutlined />
        </CCTVCard>
        <DailyCard>
          <CalendarMonth />
        </DailyCard>
      </SummaryContent>
    </SummaryContainer>
  );
}

export default SummaryPage;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SummaryHeader = styled.div`
  display: flex;
  padding: 2rem;

  .MuiCard-root {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.3rem;
    margin-right: 0.5rem;

    background-color: ${props => props.theme.palette.primary.main};

    svg {
      color: ${props => props.theme.palette.primary.contrastText};
    }
  }
`;

const SummaryContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 2rem;
`;

const CCTVCard = styled(Card)`
  position: relative;
  height: 40vh;
  width: 30vw;

  padding: 1rem;
  margin: 0 1rem 1rem 0;

  border-radius: 1rem;
  background: ${props =>
    `linear-gradient(to bottom right, ${props.theme.palette.primary.main}, ${props.theme.palette.primary.light})`};
  transition: 0.2s all ease;

  :hover {
    scale: 1.05;
  }

  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 20rem;
    color: #ffffff6f;
  }
`;

const TeamCard = styled(Card)`
  position: relative;
  height: 40vh;
  width: 30vw;

  padding: 1rem;
  margin: 0 1rem 1rem 0;

  border-radius: 1rem;
  background-image: ${props =>
    `linear-gradient(to bottom right, ${props.theme.palette.error.main}, ${props.theme.palette.error.light})`};

  transition: 0.2s all ease;

  :hover {
    scale: 1.05;
  }

  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 20rem;
    color: #ffffff6f;
  }
`;

const DailyCard = styled(Card)`
  position: relative;
  height: 40vh;
  width: 30vw;

  padding: 1rem;
  margin: 0 1rem 1rem 0;

  border-radius: 1rem;
  background: ${props =>
    `linear-gradient(to bottom right, ${props.theme.palette.secondary.main}, ${props.theme.palette.secondary.light})`};
  transition: 0.2s all ease;

  :hover {
    scale: 1.05;
  }

  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 20rem;
    color: #ffffff6f;
  }
`;

const EquipmentCard = styled(Card)`
  position: relative;
  height: 40vh;
  width: 30vw;

  padding: 1rem;
  margin: 0 1rem 1rem 0;

  border-radius: 1rem;
  background: ${props =>
    `linear-gradient(to bottom right, ${props.theme.palette.success.main}, ${props.theme.palette.success.light})`};
  transition: 0.2s all ease;

  :hover {
    scale: 1.05;
  }

  svg {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
    font-size: 20rem;
    color: #ffffff6f;
  }
`;
