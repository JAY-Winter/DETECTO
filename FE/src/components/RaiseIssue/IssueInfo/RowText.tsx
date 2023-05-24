import React from 'react';
import styled from '@emotion/styled';
import { mobileV } from '@/utils/Mixin';

function RowText({ title, content }: { title: string; content: string }) {
  return (
    <RowDiv>
      <p className="title">{title}</p>
      <p className="content">{content}</p>
    </RowDiv>
  );
}

export default RowText;

const RowDiv = styled.div`
  margin: 0 0.2rem 1rem 0;
  padding: 0 1rem;
  height: 100%;

  p.title {
    font-weight: 700;
    margin-bottom: 0.1rem;
  }

  p.content {
    width: 100%;
  }

  ${mobileV} {
    margin: 0;
    padding: 0;
  }
`;
