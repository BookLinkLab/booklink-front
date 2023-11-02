import React from "react"
import "./styles.css"
import Button from "../Button"
import "bootstrap-icons/font/bootstrap-icons.css"

const Notification = ({ forumImg, forumName, posterName, isSeen = true }) => {
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
                        {"@" + posterName + " "}
                    </text>
                    <text className={`body1 ${isSeen ? "seen" : ""}`}>
                        creó una nueva publicación en
                    </text>
                    <text className={`body1 ${isSeen ? "seen" : ""}`}> "{forumName}"!</text>
                </div>
                <div>
                    <span className={`body2 ${isSeen ? "seen" : ""}`}>
                        Haz click para ver la publicación
                    </span>
                </div>
                <div className="delete-button-style">
                    <Button variant="ghost">
                        <i class="bi bi-trash-fill red"></i>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Notification
