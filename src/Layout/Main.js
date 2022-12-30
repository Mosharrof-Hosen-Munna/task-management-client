import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigations from '../Pages/Shared/Navigation/Navigations'

const Main = () => {
  return (
    <div>
        <Navigations/>
        <Outlet/>
    </div>
  )
}

export default Main