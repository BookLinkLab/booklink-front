import React from "react"
import { Navigate, Outlet, Route } from "react-router-dom"
import { useCurrentUser } from "../../hooks/useCurrentUser"

const PublicRoute = ({ component: Component, ...rest }) => {
    const { token } = useCurrentUser()
    return !token ? <Outlet /> : <Navigate to="/home" />
}
export default PublicRoute
