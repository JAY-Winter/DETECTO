import useAuth from '@/utils/useAuth';
import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuth();

  if (isAuthenticated) {
    return (
      <>
        { children }
      </>
    )
  } else {
    return <Navigate to="/login" replace={true} />
  }
}

export default ProtectedRoute