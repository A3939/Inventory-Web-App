import React from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectRoutes = ({children}) => {
    const navigate = useNavigate()
    const isLogin = localStorage.getItem('isAuthenticated')

  return (
    <>
        {isLogin ? {children}: navigate('login')}
    </>
  )
}

export default ProtectRoutes