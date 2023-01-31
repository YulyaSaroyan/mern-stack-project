import React, { lazy } from 'react'
import { Outlet } from 'react-router-dom'

const Nav = lazy(() => import('../../components/Nav/Nav'))

const Wrapper = () => {
    return (
        <div className="wrapper">
            <Nav/>
            <Outlet/>
        </div>
    )
}

export default Wrapper