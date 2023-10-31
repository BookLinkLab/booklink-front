import Notification from "../../components/Notification"
import React from "react"
import Background from "../../assets/images/background.png"
import "./styles.css"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"

const Notifications = () => {
    const forumName = "Foro de prueba"
    const posterName = "Usuario de prueba"
    const forumImg = Background
    const navigate = useNavigate()

    return (
        <div className="notifications">
            <div className="notificationsHeader">
                <text className="title">Notificaciones</text>
                <Button
                    className="body1"
                    variant={"ghost"}
                    onClick={() => navigate("/configuration")}
                >
                    Configuración
                </Button>
            </div>
            <Notification
                forumImg={forumImg}
                forumName={forumName}
                posterName={posterName}
                isSeen={true}
            />
            <Notification
                forumImg={forumImg}
                forumName={forumName}
                posterName={posterName}
                isSeen={false}
            />
        </div>
    )
}

export default Notifications
