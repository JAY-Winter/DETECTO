import React from 'react'
import loadingImage from '/public/icons/icon-192x192-rounded.png'
import { css } from '@emotion/react'

function LoadingWithLogo() {
  return (
    <div css={loadingContainer}>
      <img src={loadingImage} alt="" />
    </div>
  )
}

const loadingContainer = css`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default LoadingWithLogo