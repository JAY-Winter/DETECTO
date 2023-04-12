import { css } from '@emotion/react';
import React from 'react'
import { useRecoilState } from 'recoil';
import { textState } from './atoms';

function TextInput() {
  const [text, setText] = useRecoilState(textState);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div>
      <div css={container}>안녕</div>
      <input type="text" value={text} onChange={onChange} />
      <br />
      Echo: {text}
    </div>
  );
}

const container = css`
  background-color: coral;
`

export default TextInput