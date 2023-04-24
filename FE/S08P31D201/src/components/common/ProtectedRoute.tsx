import SignIn from '@/pages/SignIn';
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = true;

  if (isAuthenticated) {
    return (
      <>
        { children }
      </>
    )
  } else {
    return <Navigate to="/signin" replace={true} />
  }
}

export default ProtectedRoute