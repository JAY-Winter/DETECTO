import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Card } from '@mui/material';

function WorkerIssueImage({ reportid }: { reportid: string }) {
  return (
    <ImageWrapper>
      <img
        css={IssueImageStyle}
        src={`https://kr.object.ncloudstorage.com/detec/report/${reportid}.jpg`}
        alt="report image"
      />
    </ImageWrapper>
  );
}

export default WorkerIssueImage;

const ImageWrapper = styled(Card)`
  width: 100%;
  min-height: 20rem;
  max-height: 20rem;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  background-color: ${props => props.theme.palette.neutral.section};
`;

const IssueImageStyle = css`
  width: 100%;
  height: auto;
  object-fit: contain;
`;
