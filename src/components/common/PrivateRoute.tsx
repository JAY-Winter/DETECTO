import useAuth from '@/utils/useAuth'
import React from 'react'
import { Route } from 'react-router-dom';

type PrivateRouteProps = {
  children: React.ReactNode
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const isAuthenticated = useAuth();

  return (
    <></>
  )
}

export default PrivateRoute