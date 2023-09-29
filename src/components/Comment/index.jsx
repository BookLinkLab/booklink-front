import "./styles.css"
import React from "react"
import { Ellipse } from "../../assets/icons/ellipse"
import "moment/locale/es"

import Moment from "react-moment"

const Comment = ({
    username,
    commentDate,
    commentText,
    commentsButtonAction,
    editButtonAction,
    deleteButtonAction,
    commentsAmount,
}) => {
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
                            onClick={deleteButtonAction}
                            className={"comment-profile-buttons body2"}
                        >
                            Eliminar
                        </button>
                        <button
                            onClick={editButtonAction}
                            className={"comment-profile-buttons body2 underlined"}
                        >
                            Editar
                        </button>
                    </div>
                    <p className={"body1"}>{commentText}</p>
                    <button
                        onClick={commentsButtonAction}
                        className={"comment-profile-buttons body2 underlined"}
                    >
                        {commentsAmount} Comentarios
                    </button>
                </div>

                {/*Traer componente de chulo*/}
                {/*<div className={"comment-like-buttons-div"}>*/}
                {/*    <div className={"comment-icon-div"}>*/}
                {/*        <button className={"comment-like-unlike-button " + (liked && "liked-button")}*/}
                {/*                onClick={likeButtonAction}>*/}
                {/*            <ThumbUp width={16} height={16} color={liked ? "#70BE7C" : "#747F86"}/>*/}
                {/*        </button>*/}
                {/*        <p className={"body2"}>{likeAmount}</p>*/}
                {/*    </div>*/}
                {/*    <div className={"comment-icon-div"}>*/}
                {/*        <button className={"comment-like-unlike-button " + (disliked && "disliked-button")}*/}
                {/*                onClick={dislikeButtonAction}>*/}
                {/*            <ThumbDown width={16} height={16} color={disliked ? "#94313E" : "#747F86"}/>*/}
                {/*        </button>*/}
                {/*        <p className={"body2"}>{dislikeAmount}</p>*/}
                {/*    </div>*/}

                {/*</div>*/}
            </div>
        </div>
    )
}
export default Comment
