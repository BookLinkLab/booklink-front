import React from "react"
import "./styles.css"

const Notification = ({ forumImg, content, forumName, authorName, isSeen = true, id, onClick }) => {
    const seenChecker = isSeen ? "notificationContainer seen" : "notificationContainer"

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
                        {"@" + authorName + " "}
                    </text>
                    <text className={`body1 ${isSeen ? "seen" : ""}`}>{content}</text>
                    <text className={`body1 ${isSeen ? "seen" : ""}`}> "{forumName}"!</text>
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
