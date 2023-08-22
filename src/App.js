import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./screens/login/index.jsx"
import "./App.css"
import CreateForum from "./screens/createForum/createForum"
import Notifications from "./screens/notifications/notifications"
import Profile from "./screens/profile/profile"
import Navbar from "./components/navbar"

function App() {
    const isLogged = true

    return (
        <Router>
            {isLogged ? <Navbar /> : null}
            <Routes>
                <Route path="/createForum" element={<CreateForum />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
