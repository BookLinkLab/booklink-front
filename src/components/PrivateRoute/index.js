import React from "react"
import { Navigate, Outlet } from "react-router-dom"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import Navbar from "../Navbar"

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => {
    const { token } = useCurrentUser()

    return token ? (
        <>
            <Navbar />
            <Outlet />
        </>
    ) : (
        <Navigate to="/login" />
    )
}
export default PrivateRoute
