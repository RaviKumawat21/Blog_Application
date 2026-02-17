import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice.js'
import {authService} from '../../appwrite/auth.js' // imorting object of the AuthService class so we can call the logout method of the class
function Logout() {
  const dispatch = useDispatch()
  const handleLogout = () => {
    authService.logout().then((e)=> {
      // console.log(e) undefined d=because the logout method of the AuthService class does not return anything, it just deletes the current session and returns undefined
      dispatch(logout())}) // calling the logout method of the AuthService class and then dispatching the logout action to update the state in the redux store
      
  }

  return (
    <button
    className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={handleLogout}
    >Logout</button>
  )
}

export default Logout