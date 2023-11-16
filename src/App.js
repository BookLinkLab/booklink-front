import React, { useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./screens/login/index.jsx"
import Register from "./screens/register"
import CreateForum from "./screens/createForum"
import Index from "./screens/notifications"
import NotFound from "./screens/notFound"
import ProfileScreen from "./screens/profile"
import PrivateRoute from "./components/PrivateRoute"
import { useCurrentUser } from "./hooks/useCurrentUser"
import PublicRoute from "./components/PublicRoute"
import Home from "./screens/home"
import EditForum from "./screens/editForum"
import Forum from "./screens/forum"
import withToast from "./hoc/withToast"
import CommentsScreen from "./screens/comments"
import SettingsScreen from "./screens/settings"
import { ToastContainer } from "react-toastify"

function App({ showToast }) {
    const { token } = useCurrentUser()

    useEffect(() => {
        const updateState = () => {}

        window.addEventListener("storage", updateState())
        return () => {
            window.removeEventListener("storage", updateState())
        }
    }, [])

    return (
        <>
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
                        <Route path={"/notifications"} element={<Index />} />
                    </Route>
                    <Route path={"/profile"} element={<PrivateRoute />}>
                        <Route path={"/profile/:id"} element={<ProfileScreen />} />
                    </Route>
                    <Route path={"/home"} element={<PrivateRoute />}>
                        <Route path={"/home"} element={<Home />} />
                    </Route>
                    <Route path={"/forum/:forumId"} element={<PrivateRoute />}>
                        <Route path={"/forum/:forumId"} element={<Forum />} />
                        <Route path={"/forum/:forumId/post/:postId"} element={<CommentsScreen />} />
                    </Route>
                    <Route path={"/editForum/:forumId"} element={<PrivateRoute />}>
                        <Route
                            path={"/editForum/:forumId"}
                            element={<EditForum showExternalToast={showToast} />}
                        />
                    </Route>
                    {/* Not Found */}
                    <Route path={"/configuration"} element={<PrivateRoute />}>
                        <Route path={"/configuration"} element={<SettingsScreen />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
            <ToastContainer />
        </>
    )
}

export default withToast(App)
