import ChevronLeft from "../../assets/icons/chevronLeft"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import ForumNotificationsConfigCard from "../../components/ForumConfiguration"

const SettingsScreen = () => {
    const navigate = useNavigate()
    const [forumCards, setForumCards] = useState([
        { name: "Los tomadores del Olimpo", img: "", switchState: "on", id: 4 },
        { name: "Guerreros de Viento", img: "", switchState: "on", id: 5 },
        { name: "Los iluminados por el rayo", img: "", switchState: "off", id: 7 },
    ])
    return (
        <div className="configuration-block-container">
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
                            forumId={card.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default SettingsScreen
