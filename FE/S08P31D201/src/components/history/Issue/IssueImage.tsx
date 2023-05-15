import React from 'react';
import { css } from '@emotion/react';

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
      <h1 style={{ width: '100%' }}>위반 사진</h1>
      {/* <h2 style={{ margin: '0.5rem 0 1rem 0' }}>위반 사진</h2> */}
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
