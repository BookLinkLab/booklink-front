import React from "react"
import { useNavigate } from "react-router-dom"
import NotificationBell from "../../assets/icons/notificationBell"
import Logo from "../../assets/icons/logo"
import "./styles.css"
import Button from "../Button"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <div className="navbar">
            <div className="left-content" onClick={() => navigate("/home")}>
                <div className="logo">
                    <Logo height="29" width="28" />
                </div>
                <p style={{ fontWeight: "bold" }}>Book</p>
                <p>Link</p>
            </div>
            <div className="buttons">
                <Button size="medium" variant="ghost" onClick={() => navigate("/createForum")}>
                    Crear foro
                </Button>
                <Button
                    size="medium"
                    variant="ghost"
                    style={{ marginLeft: 16, marginRight: 24 }}
                    onClick={() => navigate("/notifications")}
                >
                    <NotificationBell height="18" width="18" color="#94313E" />
                </Button>
                <img
                    src={require("../../assets/images/profile.png")}
                    alt="Profile"
                    onClick={() => navigate("/profile/:id")}
                    style={{ marginLeft: 24 }}
                />
            </div>
        </div>
    )
}

export default NavBar
