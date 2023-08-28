import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./screens/login/index.jsx"
import Register from "./screens/register/register"
import CreateForum from "./screens/createForum/createForum"
import Notifications from "./screens/notifications/notifications"
import NotFound from "./screens/notFound/notFound"
import Navbar from "./components/Navbar"
import ProfileScreen from "./screens/profile"
import PrivateRoute from "./components/PrivateRoute"
import { useCurrentUser } from "./hooks/useCurrentUser"

function App() {
    const { isAuthenticated } = useCurrentUser()

    return (
        <Router>
            {isAuthenticated ? <Navbar /> : null}
            <Routes>
                {/* Public routes */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                {/* Private routes */}
                <Route
                    path="/createForum"
                    element={
                        <PrivateRoute>
                            <CreateForum />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <PrivateRoute>
                            <Notifications />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <ProfileScreen />
                        </PrivateRoute>
                    }
                />
                {/* Not Found */}
                <Route path="*" element={<NotFound isLogged={isAuthenticated} />} />
            </Routes>
        </Router>
    )
}

export default App
