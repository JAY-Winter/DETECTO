import styled from '@emotion/styled'
import React from 'react'

function App() {
  return (
    <StyledDiv>
      안녕
    </StyledDiv>
  )
}

const StyledDiv = styled.div`
  color: ${props => props.theme.colors.primary};
`

export default App