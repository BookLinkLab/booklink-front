import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./screens/login/index.jsx"
import Register from "./screens/register/register"
import CreateForum from "./screens/createForum/createForum"
import Notifications from "./screens/notifications/notifications"
import NotFound from "./screens/notFound/notFound"
import ProfileScreen from "./screens/profile"
import PrivateRoute from "./components/PrivateRoute"
import { useCurrentUser } from "./hooks/useCurrentUser"
import PublicRoute from "./components/PublicRoute"
import Home from "./screens/home"
import Forum from "./screens/forum/forum"
import EditForum from "./screens/editForum"

function App() {
    const { token } = useCurrentUser()
    console.log("token", token)

    useEffect(() => {
        const updateState = () => {
            console.log("updateState")
        }

        window.addEventListener("storage", updateState())
        return () => {
            window.removeEventListener("storage", updateState())
        }
    }, [])

    return (
        <Router>
            <Routes>
                {/* Public routes */}
                <Route path={"/register"} element={<PublicRoute />}>
                    <Route path={"/register"} element={<Register />} />
                </Route>
                <Route path={"/login"} element={<PublicRoute />}>
                    <Route path={"/login"} element={<Login />} />
                </Route>

                {/* Private routes */}
                <Route path={"/createForum"} element={<PrivateRoute />}>
                    <Route path={"/createForum"} element={<CreateForum />} />
                </Route>
                <Route path={"/notifications"} element={<PrivateRoute />}>
                    <Route path={"/notifications"} element={<Notifications />} />
                </Route>
                <Route path={"/profile"} element={<PrivateRoute />}>
                    <Route path={"/profile/:id"} element={<ProfileScreen />} />
                </Route>
                <Route path={"/home"} element={<PrivateRoute />}>
                    <Route path={"/home"} element={<Home />} />
                </Route>
                <Route path={"/forum/:id"} element={<PrivateRoute />}>
                    <Route path={"/forum/:id"} element={<Forum />} />
                </Route>
                <Route path={"/editForum/:forumId"} element={<PrivateRoute />}>
                    <Route path={"/editForum/:forumId"} element={<EditForum />} />
                </Route>

                {/* Not Found */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    )
}

export default App
