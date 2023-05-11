import { tabletV } from '@/utils/Mixin';
import styled from '@emotion/styled';
import { Card } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import Monitor from '@components/monitor/Monitor';

const cctvidlist = [0, 1, 2];

function MonitorPage() {
  return (
    <MonitorContainer>
      <MonitorHeader>
        <Card>
          <VideocamOutlinedIcon />
        </Card>
        <h1>모니터링</h1>
      </MonitorHeader>
      <MonitorContentsDiv>
        {cctvidlist.map(id => {
          return <Monitor key={'cctvScreen' + id} monitorId={id} />;
        })}
      </MonitorContentsDiv>
    </MonitorContainer>
  );
}

export default MonitorPage;

const MonitorContainer = styled.div`
  /* width: 100%; */
  display: flex;
  flex-direction: column;

  height: 100%;
  align-items: center;
  padding: 2.5rem 2rem;
  ${tabletV} {
    align-items: normal;
  }
`;

const MonitorHeader = styled.div`
  display: flex;
  /* padding: 2rem; */
  width: 100%;
  margin: 0rem 0rem 2rem;

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

const MonitorContentsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
