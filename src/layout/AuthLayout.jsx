import React from 'react'
import { Outlet } from 'react-router-dom'
import authBG from '@/assets/images/authBG.jpg'
import authLeft from '@/assets/images/authLeft.svg'
const AuthLayout = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center bg-cover bg-center' style={{backgroundImage:`url(${authBG})`}}>
      <div className='flex w-full h-full'>
       <div className='w-1/2 hidden md:flex items-center justify-center'>
       <img src={authLeft} alt="" />
       </div>
       <div className='md:w-1/2 flex w-full items-center justify-center p-4'>
      <Outlet />
       </div>

      </div>
    </div>
  )
}

export default AuthLayout
