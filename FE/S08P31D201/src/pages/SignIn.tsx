import { TextField } from '@mui/material'
import React from 'react'

function SignIn() {
  return (
    <div>
      <div>배경화면</div>
      <form action="">
        <TextField label="아이디 입력" />
        <TextField label="비밀번호 입력" type="password" />
      </form>
    </div>
  )
}

export default SignIn