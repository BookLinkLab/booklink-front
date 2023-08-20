import React from "react"
import { useNavigate } from "react-router-dom"
import NotificationBell from "../../assets/icons/notificationBell"
import Logo from "../../assets/icons/logo"
import "./styles.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <div className="navbar">
            <div className="left-content">
                <div className="logo">
                    <Logo height="29" width="28" />
                </div>
                <text style={{ fontWeight: "bold" }}>Book</text>
                <text>Link</text>
            </div>
            <div className="buttons">
                <button style={{ color: "#94313E" }} onClick={() => navigate("/createForum")}>
                    Crear foro
                </button>
                <button
                    style={{ marginLeft: 16, marginRight: 24 }}
                    onClick={() => navigate("/notifications")}
                >
                    <NotificationBell width={"18"} height={"18"} color={"#94313E"} />
                </button>
                <img
                    src={require("../../assets/images/profile.png")}
                    alt="Profile"
                    onClick={() => navigate("/profile")}
                />
            </div>
        </div>
    )
}

export default NavBar
