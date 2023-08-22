import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Login from "./screens/login/index.jsx"
import Register from "./screens/register/register"
import CreateForum from "./screens/createForum/createForum"
import Notifications from "./screens/notifications/notifications"
import Profile from "./screens/profile/profile"
import NotFound from "./screens/notFound/notFound"
import Navbar from "./components/navbar"

function App() {
    const isLogged = true

    return (
        <Router>
            <Routes>
                {isLogged ? <Navbar /> : null}
                <Route path="/register" element={<Register />} />
                <Route path="/createForum" element={<CreateForum />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
                <Route path="/notFound" element={<NotFound isLogged={isLogged} />} />
            </Routes>
        </Router>
    )
}

export default App
