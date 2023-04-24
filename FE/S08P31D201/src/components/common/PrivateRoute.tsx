import useAuth from '@/utils/useAuth'
import React from 'react'
import { Route } from 'react-router-dom';

type PrivateRouteProps = {
  element: React.ReactNode
}

function PrivateRoute({ element, ...rest}: PrivateRouteProps) {
  const isAuthenticated = useAuth();

  return (
    <Route
      {...rest}
      element={element}
    />
  )
}

export default PrivateRoute