import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import CreateForum from "./screens/createForum/createForum"
import Notifications from "./screens/notifications/notifications"
import Profile from "./screens/profile/profile"

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/createForum' element={<CreateForum/>}/>
                <Route path='/notifications' element={<Notifications/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </Router>
    )
}

export default App
