import React from "react"
import { Navigate } from "react-router-dom"
import { useCurrentUser } from "../../hooks/useCurrentUser"

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useCurrentUser()

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    return children
}

export default PrivateRoute
