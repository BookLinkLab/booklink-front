import ChevronLeft from "../../assets/icons/chevronLeft"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ForumNotificationsConfigCard from "../../components/ForumConfiguration"
import Loader from "../../components/Loader"
import withToast from "../../hoc/withToast"
import { getNotificationSettings } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"

const SettingsScreen = ({ showToast }) => {
    const navigate = useNavigate()
    const { token } = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const [forumCards, setForumCards] = useState([])

    useEffect(() => {
        setLoading(true)
        handleGetNotificationSettings().then(setLoading(false))
    }, [])

    const handleGetNotificationSettings = async () => {
        const response = getNotificationSettings(token)
        if (response.status === 200) {
            setForumCards(response.data)
            showToast(response.body, "success")
        } else {
            showToast(response.body, "error")
        }
    }

    return (
        <div className="configuration-block-container">
            <Loader open={loading} />
            <div className="button-configuration-container">
                <ChevronLeft onClick={() => navigate(`/notifications`)} />
                <h3 className="bold configuration-title">Configuracion</h3>
            </div>
            <div className="configuration-map">
                {forumCards.map((card) => (
                    <div className="config-card">
                        <ForumNotificationsConfigCard
                            name={card.name}
                            img={card.img}
                            switchState={card.switchState}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default withToast(SettingsScreen)
