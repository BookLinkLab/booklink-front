import "./styles.css"
import Switch from "@mui/material/Switch"

const ForumNotificationsConfigCard = ({ img, name, switchState }) => {
    return (
        <>
            <div className={"forum-notification-config-card-div-1"}>
                <div className={"forum-notification-config-card-div-2"}>
                    <img className={"forum-notification-config-card-img"} src={img}></img>
                    <div className={"forum-notification-config-card-div-3"}>
                        <p className={"body1bold"}>{name}</p>
                    </div>
                </div>
                <Switch className={"switch"} defaultChecked={switchState} />
            </div>
        </>
    )
}
export default ForumNotificationsConfigCard
