import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Login from "./screens/login/index.jsx"
import Register from "./screens/register/register"
import CreateForum from "./screens/createForum/createForum"
import Notifications from "./screens/notifications/notifications"
import NotFound from "./screens/notFound/notFound"
import Navbar from "./components/Navbar"
import ProfileScreen from "./screens/profile"

function App() {
    const isLogged = true
    return (
        <Router>
            {isLogged ? <Navbar /> : null}
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/createForum" element={<CreateForum />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<ProfileScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="/notFound" element={<NotFound isLogged={isLogged} />} />
            </Routes>
        </Router>
    )
}

export default App
