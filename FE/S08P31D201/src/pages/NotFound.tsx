import { css } from '@emotion/react'
import React from 'react'

function NotFound() {
  return (
    <div css={container}>
      <h1 style={{marginBottom: "10px"}}>404</h1>
      <h3>페이지를 찾을 수 없습니다</h3>
    </div>
  )
}

const container = css`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default NotFound