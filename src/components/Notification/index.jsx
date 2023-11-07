import React from "react"
import "./styles.css"

const Notification = ({ forumImg, content, forumName, posterName, isSeen = true }) => {
    const seenChecker = isSeen ? "notificationContainer seen" : "notificationContainer"
    const posterValue = posterName ?? content.match(/@(\w+)\s/)[1]
    const forumValue = forumName ?? content.match(/"([^"]+)"/)[1]
    const handleClick = () => {
        if (!isSeen) {
            console.log("redirection")
        }
    }

    return (
        <div className={seenChecker} onClick={handleClick}>
            <img className="forumImage" src={forumImg} alt="notification" />
            <div className="notificationText">
                <div>
                    <text className={`body1 bold ${isSeen ? "seen" : ""}`}>
                        {"@" + posterValue + " "}
                    </text>
                    <text className={`body1 ${isSeen ? "seen" : ""}`}>
                        creó una nueva publicación en
                    </text>
                    <text className={`body1 ${isSeen ? "seen" : ""}`}> "{forumValue}"!</text>
                </div>
                <div>
                    <span className={`body2 ${isSeen ? "seen" : ""}`}>
                        Haz click para ver la publicación
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Notification
