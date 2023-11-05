import Notification from "../../components/Notification"
import React, { useEffect, useState } from "react"
import Background from "../../assets/images/background.png"
import "./styles.css"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { getNotifications } from "../../service/apis"

const Notifications = ({ showToast }) => {
    const forumName = "Foro de prueba"
    const posterName = "Usuario de prueba"
    const forumImg = Background
    const { token } = useCurrentUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        setLoading(true)
        handleGetNotifications().then()
        setLoading(false)
    }, [])

    const handleGetNotifications = async () => {
        const response = await getNotifications(token)
        if (response.status === 200) {
            setNotifications(response.data)
            showToast(response.body, "success")
        } else {
            showToast(response.body, "error")
        }
    }

    return (
        <div className="notifications">
            <Loader open={loading} />
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
