import ChevronLeft from "../../assets/icons/chevronLeft"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ForumNotificationsConfigCard from "../../components/ForumConfiguration"
import Loader from "../../components/Loader"
import withToast from "../../hoc/withToast"

const SettingsScreen = ({ showToast }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forumCards, setForumCards] = useState([])

    const getNotificationSettings = async () => {
        setLoading(true)
        const response = getNotificationSettings()
        if (response.status === 200) {
            setForumCards(response.data)
            showToast(response.body, "success")
        } else {
            showToast(response.body, "error")
        }
        setLoading(false)
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
