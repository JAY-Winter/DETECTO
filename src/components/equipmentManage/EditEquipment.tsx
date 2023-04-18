import styled from '@emotion/styled'
import React from 'react'

function EditEquipment() {
  return (
    <EditEquipmentDiv>

    </EditEquipmentDiv>
  )
}

const EditEquipmentDiv = styled.div`
  width: 60vw;
  height: 70vh;
  background-color: ${props => props.theme.palette.neutral.main};
`

export default EditEquipment