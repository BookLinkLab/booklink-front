import "./styles.css"
import React from "react"
import { Ellipse } from "../../assets/icons/ellipse"
import "moment/locale/es"

import Moment from "react-moment"

const Comment = ({ username, commentDate, commentText, commentsAmount }) => {
    return (
        <div className={"comment-main-div"}>
            <img
                src={require("../../assets/images/profile.png")}
                alt="Profile"
                style={{ marginLeft: 24 }}
            />
            <div className={"comment-sub-div"}>
                <div className={"comment-sub-div-2"}>
                    <div className={"comment-time-div"}>
                        <div className={"comment-username-div"}>
                            <p className={"body1bold"}>{username}</p>
                            <Ellipse width={4} height={4} color={"none"} />
                            <Moment locale="es" fromNow className={"body1"}>
                                {new Date(commentDate)}
                            </Moment>
                        </div>

                        <button
                            onClick={() => {
                                console.log("deleted")
                            }}
                            className={"comment-profile-buttons body2"}
                        >
                            Eliminar
                        </button>
                        <button
                            onClick={() => {
                                console.log("editing")
                            }}
                            className={"comment-profile-buttons body2 underlined"}
                        >
                            Editar
                        </button>
                    </div>
                    <p className={"body1"}>{commentText}</p>
                    <button
                        onClick={() => {
                            console.log("commenting")
                        }}
                        className={"comment-profile-buttons body2 underlined"}
                    >
                        {commentsAmount} Comentarios
                    </button>
                </div>

                {/*Traer componente de chulo*/}
            </div>
        </div>
    )
}
export default Comment
