import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice.js'
import authService from '../../appwrite/auth.js'

function Logout() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button className="btn btn-danger btn-sm" onClick={handleLogout}>
      Logout
    </button>
  )
}

export default Logout