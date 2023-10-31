import Notification from "../../components/Notification"
import React from "react"
import Background from "../../assets/images/background.png"
import "./styles.css"

const Notifications = () => {
    const forumName = "Foro de prueba"
    const posterName = "Usuario de prueba"
    const forumImg = Background

    return (
        <div className="notifications">
            <div className="notificationsHeader">
                <text className="title">Notificaciones</text>
                <text className="body1">Configuracion</text>
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
