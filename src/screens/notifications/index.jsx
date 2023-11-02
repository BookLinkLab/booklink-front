import Notification from "../../components/Notification"
import React, { useState } from "react"
import Background from "../../assets/images/background.png"
import "./styles.css"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import withToast from "../../hoc/withToast"

const Notifications = ({ showToast }) => {
    const forumName = "Foro de prueba"
    const posterName = "Usuario de prueba"
    const forumImg = Background
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([])

    const getNotifications = async () => {
        setLoading(true)
        const response = await getNotifications()
        if (response.status === 200) {
            setNotifications(response.data)
            showToast(response.body, "success")
        } else {
            showToast(response.body, "error")
        }
        setLoading(false)
    }

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
            {notifications.map((notification) => (
                <Notification
                    forumImg={notification.forumImg}
                    forumName={notification.forumName}
                    posterName={notification.posterName}
                    isSeen={notification.isSeen}
                />
            ))}
        </div>
    )
}

export default withToast(Notifications)
