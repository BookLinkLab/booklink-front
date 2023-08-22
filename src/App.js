import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import Login from "./screens/login/index.jsx"
import Register from "./screens/register/register"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
            </Routes>
            <Routes>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App
