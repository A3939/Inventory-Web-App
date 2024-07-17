import React from 'react'
import { useNavigate,Navigate } from 'react-router-dom'

const ProtectRoutes = ({children}) => {
    const navigate = useNavigate()
    const isLogin = localStorage.getItem('isAuthenticated')

  return (
    <>
        {isLogin ? children: <Navigate to="/login" />}
    </>
  )
}

export default ProtectRoutes