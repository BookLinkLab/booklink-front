import "./styles.css"
import Switch from "@mui/material/Switch"
import { toggleNotifications } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import withToast from "../../hoc/withToast"

const ForumNotificationsConfigCard = ({ img, name, switchState, forumId, showToast }) => {
    const { token, id } = useCurrentUser()

    const handleToggle = () => {
        toggleNotifications(token, forumId).then((response) => {
            if (response.status === 200) {
                showToast(response.data, "success")
            } else {
                showToast(response.data.error, "error")
            }
        })
    }

    return (
        <>
            <div className={"forum-notification-config-card-div-1"}>
                <div className={"forum-notification-config-card-div-2"}>
                    <img className={"forum-notification-config-card-img"} src={img}></img>
                    <div className={"forum-notification-config-card-div-3"}>
                        <p className={"body1bold"}>{name}</p>
                    </div>
                </div>
                <Switch
                    className={"switch"}
                    defaultChecked={switchState}
                    onChange={() => handleToggle()}
                />
            </div>
        </>
    )
}
export default withToast(ForumNotificationsConfigCard)
