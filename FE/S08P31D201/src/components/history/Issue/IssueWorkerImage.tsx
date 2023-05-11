import React from 'react';
import { css } from '@emotion/react';
import { Card } from '@mui/material';

function IssueWorkerImage({reportid}: {reportid: string}) {
  return (
    <Card
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h2>위반 사원 사진</h2>
      <img css={IssueImageStyle} src={`https://kr.object.ncloudstorage.com/detec/report/h${reportid}.jpg`} alt="" />
    </Card>
  );
}

export default IssueWorkerImage;

const IssueImageStyle = css`
  width: 100%;
  max-width: 350px;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;