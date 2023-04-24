import React from 'react'
import { Route, Routes } from 'react-router-dom'

function Root() {
  return (
    <>
      <div>네비여</div>
      <Routes>
        <Route path="dash" element={<div>대시보드임</div>}/>
      </Routes>
    </>
  )
}

export default Root