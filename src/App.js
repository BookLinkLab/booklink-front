import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import CreateForum from "./screens/createForum/createForum"
import Notifications from "./screens/notifications/notifications"
import Navbar from "./components/navbar"
import ProfileScreen from "./screens/profile"

function App() {
    const isLogged = true

    return (
        <Router>
            {isLogged ? <Navbar /> : null}
            <Routes>
                <Route path="/createForum" element={<CreateForum />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/profile" element={<ProfileScreen />} />
            </Routes>
        </Router>
    )
}

export default App
