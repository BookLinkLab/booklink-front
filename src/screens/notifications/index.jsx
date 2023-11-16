import Notification from "../../components/Notification"
import React, { useEffect, useState } from "react"
import Background from "../../assets/images/background.png"
import "./styles.css"
import Button from "../../components/Button"
import { useNavigate } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { updateNotificationState } from "../../service/apis"
import { getNotifications } from "../../service/apis"

const Notifications = ({ showToast }) => {
    const { token } = useCurrentUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        setLoading(true)
        handleGetNotifications().then()
        setLoading(false)
    }, [notifications.length])

    const handleGetNotifications = async () => {
        const response = await getNotifications(token)
        if (response.status === 200) {
            setNotifications(response.data)
            showToast(response.body, "success")
        } else {
            showToast(response.body, "error")
        }
    }

    const handleUpdateNotificationState = async (id, forumId, postId) => {
        setLoading(true)
        const response = await updateNotificationState(token, id)
        if (response.status === 200) {
            handleGetNotifications().then()
            navigate(`/forum/${forumId}/post/${postId}`)
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
                    ConfiguraciÃ³n
                </Button>
            </div>
            {notifications.map((notification) => (
                <Notification
                    isProfile={false}
                    authorName={notification.authorName}
                    forumImg={notification.img}
                    forumName={notification.forumName}
                    content={notification.content}
                    isSeen={notification.seen}
                    refetch={handleGetNotifications}
                    id={notification.notificationId}
                    onClick={() =>
                        handleUpdateNotificationState(
                            notification.notificationId,
                            notification.forumId,
                            notification.postId,
                        )
                    }
                />
            ))}
        </div>
    )
}

export default withToast(Notifications)
