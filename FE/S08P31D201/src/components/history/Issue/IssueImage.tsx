import React from 'react';
import { css } from '@emotion/react';
import { mobileV } from '@/utils/Mixin';
import { styled } from '@mui/material';

function IssueImage({ reportid }: { reportid: string }) {
  return (
    <div
      style={{
        width: '100%',
        height: 'fit-contents',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <IssueImageTitle>위반 사진</IssueImageTitle>
      <img
        css={IssueImageStyle}
        src={`https://kr.object.ncloudstorage.com/detec/report/${reportid}.jpg`}
        alt=""
      />
    </div>
  );
}

export default IssueImage;

const IssueImageStyle = css`
  width: 100%;
  max-width: 350px;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
`;

const IssueImageTitle = styled('h2')`
  margin: 0.5rem 0 1rem 0;

  ${mobileV} {
    width: 100%;
    font-size: 2rem;
  }
`;
