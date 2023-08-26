import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./screens/login/index.jsx"
import Register from "./screens/register/register"
import CreateForum from "./screens/createForum/createForum"
import Notifications from "./screens/notifications/notifications"
import NotFound from "./screens/notFound/notFound"
import Navbar from "./components/navbar"
import ProfileScreen from "./screens/profile"
import PrivateRoute from "./components/PrivateRoute"

function App() {
    const isLogged = false
    const auth = { user: isLogged }

    return (
        <Router>
            {isLogged ? <Navbar /> : null}
            <Routes>
                // public routes
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                // private routes
                <Route
                    path="/createForum"
                    element={
                        <PrivateRoute auth={auth}>
                            <CreateForum />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/notifications"
                    element={
                        <PrivateRoute auth={auth}>
                            <Notifications />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute auth={auth}>
                            <ProfileScreen />
                        </PrivateRoute>
                    }
                />
                // not found
                <Route path="*" element={<NotFound isLogged={isLogged} />} />
            </Routes>
        </Router>
    )
}

export default App
