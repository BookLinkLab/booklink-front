import "./styles.css"
import React, { useState, useEffect } from "react"
import { Ellipse } from "../../assets/icons/ellipse"
import "moment/locale/es"
import Moment from "react-moment"
import Modal from "../Modal"
import { useNavigate } from "react-router-dom"
import DislikeButton from "../../components/DislikeButton/index"
import LikeButton from "../../components/LikeButton/index"

const Comment = ({
    username,
    commentDate,
    commentText,
    commentsAmount,
    className,
    owner,
    isLiked,
    isDisliked,
    likeAmt,
    dislikeAmt,
}) => {
    const commentId = 1
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)

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
                            {owner && (
                                <>
                                    <button
                                        onClick={() => {
                                            setOpenModal(true)
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
                                </>
                            )}
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

                    {!owner && (
                        <div className="like-dislike-div">
                            <LikeButton initialLiked={isLiked} likeAmount={likeAmt} />
                            <DislikeButton
                                initialDisliked={isDisliked}
                                dislikeAmount={dislikeAmt}
                            />
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default Comment
