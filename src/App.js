import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import CreateForum from "./screens/createForum/createForum"
import Notifications from "./screens/notifications/notifications"
import Profile from "./screens/profile/profile"
import NotFound from "./screens/notFound/notFound"
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
                <Route path="/notFound" element={<NotFound isLogged={isLogged} />} />
            </Routes>
        </Router>
    )
}

export default App
