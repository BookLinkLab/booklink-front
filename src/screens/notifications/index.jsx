import Notification from "../../components/Notification"
import React, { useState } from "react"
import Background from "../../assets/images/background.png"
import "./styles.css"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { updateNotificationState } from "../../service/apis"

const Notifications = ({ showToast }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([])
    const { token } = useCurrentUser()

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

    const handleUpdateNotificationState = async (id) => {
        setLoading(true)
        const response = await updateNotificationState(token, id)
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
                    id={notification.id}
                    onClick={() => handleUpdateNotificationState(notification.id)}
                />
            ))}
        </div>
    )
}

export default withToast(Notifications)
