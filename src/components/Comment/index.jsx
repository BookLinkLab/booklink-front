import "./styles.css"
import React, { useState } from "react"
import { Ellipse } from "../../assets/icons/ellipse"
import "moment/locale/es"
import Moment from "react-moment"
import { useNavigate, useParams } from "react-router-dom"

const Comment = ({
    username,
    commentDate,
    commentText,
    commentsAmount,
    className,
    handleDelete,
}) => {
    const navigate = useNavigate()
    const commentId = useParams()

    return (
        <>
            <div className={`comment-main-div ${className ?? ""}`}>
                <img src={require("../../assets/images/profile.png")} alt="Profile" />
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
                                onClick={() => handleDelete()}
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
                                navigate(`comment/${commentId}`)
                            }}
                            className={"comment-profile-buttons body2 underlined"}
                        >
                            {commentsAmount} Comentarios
                        </button>
                    </div>

                    {/*Traer componente de chulo*/}
                </div>
            </div>
        </>
    )
}
export default Comment
