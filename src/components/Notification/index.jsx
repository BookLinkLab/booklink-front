import React from "react"
import "./styles.css"

const Notification = ({ forumImg, forumName, posterName }) => {
    return (
        <div className="notificationContainer" onClick={() => console.log("redirection")}>
            <img className="forumImage" src={forumImg} alt="notification" />
            <div className="notificationText">
                <div>
                    <text className="body1 bold">{"@" + posterName + " "}</text>
                    <text className="body1">creo una nueva publicación en</text>
                    <text className="body1"> "{forumName}"!</text>
                </div>
                <div>
                    <text className="body2">Haz click para ver la publicación</text>
                </div>
            </div>
        </div>
    )
}

export default Notification
