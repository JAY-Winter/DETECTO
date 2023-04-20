import styled from '@emotion/styled'
import React from 'react'

function EditEquipment() {
  return (
    <EditEquipmentDiv>
      장비 추가 및 수정 컴포넌트
    </EditEquipmentDiv>
  )
}

const EditEquipmentDiv = styled.div`
  width: 60vw;
  height: 70vh;
  background-color: ${props => props.theme.palette.neutral.main};
`

export default EditEquipment