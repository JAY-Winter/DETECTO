import styled from '@emotion/styled';
import React from 'react';

function RowText({ title, content }: { title: string; content: string }) {
  return (
    <RowDiv>
      <p>
        <span>{title}</span>: {content}
      </p>
    </RowDiv>
  );
}

export default RowText;

const RowDiv = styled.div`
  margin: 1rem 0.2rem;

  p {
    font-size: 1.1rem;
    span {
      font-weight: 500;
    }
  }
`;
