import "./styles.css"
import React, { useState, useEffect } from "react"
import { Ellipse } from "../../assets/icons/ellipse"
import "moment/locale/es"
import Moment from "react-moment"
import Modal from "../Modal"
import TextInputModal from "../TextInputModal"
import { updateComment } from "../../service/apis"
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import DislikeButton from "../../components/DislikeButton/index"
import LikeButton from "../../components/LikeButton/index"
import { dislikePost, likePost, deletePost } from "../../service/apis"
import withToast from "../../hoc/withToast"

const Comment = ({
    username,
    commentDate,
    commentText,
    commentsAmount,
    className,
    forumOwner,
    owner,
    isLiked,
    isDisliked,
    likeAmt,
    dislikeAmt,
    showToast,
    isPost,
    id,
    refresh,
}) => {
    const postId = 1
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [updateValue, setUpdateValue] = useState(commentText)
    const { token } = useCurrentUser()
    const [loading, setLoading] = useState(false)

    const handleInputChange = (value) => {
        setUpdateValue(value)
    }

    const handleUpdateComment = async (updatedCommentText) => {
        try {
            await updateComment(token, id, updatedCommentText)
            refresh()
            showToast("Comentario editado correctamente", "success")
        } catch (error) {
            showToast("Error al editar el comentario", "error")
        }
    }
    const handleDeletePost = async () => {
        try {
            setLoading(true)
            const response = await deletePost(token, id)
            if (response.status === 200) {
                showToast(response.data, "success")
                setOpenModal(false)
                refresh()
            } else {
                showToast(response.data, "error")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleLike = async () => {
        if (isPost) {
            try {
                setLoading(true)
                const response = await likePost(token, id)
                if (response.status === 200) {
                    showToast(response.data, "success")
                } else {
                    showToast(response.data, "error")
                }
            } finally {
                setLoading(false)
            }
        } else {
            // Manejar "like" en comentarios
        }
    }

    const handleDislike = async () => {
        if (isPost) {
            try {
                setLoading(true)
                const response = await dislikePost(token, id)
                if (response.status === 200) {
                    showToast(response.data, "success")
                } else {
                    showToast(response.data, "error")
                }
            } finally {
                setLoading(false)
            }
        } else {
            // Manejar "dislike" en comentarios
        }
    }

    return (
        <div>
            {!!openModal && (
                <Modal
                    className={"delete-comment-modal"}
                    showModal={!!openModal}
                    setShowModal={setOpenModal}
                    firstButtonText={"Cancelar"}
                    title={"Eliminar Comentario"}
                    subtitle={"¿Estás seguro que deseas eliminar este comentario?"}
                    secondButtonText={"Eliminar"}
                    handleOnClose={() => setOpenModal(undefined)}
                    firstButtonAction={() => setOpenModal(undefined)}
                    secondButtonAction={handleDeletePost}
                />
            )}
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
                            {(owner || forumOwner) && (
                                <button
                                    onClick={() => {
                                        setOpenModal(true)
                                    }}
                                    className={"comment-profile-buttons body2"}
                                >
                                    Eliminar
                                </button>
                            )}
                            {owner && (
                                <button
                                    onClick={() => {
                                        setShowModal(true)
                                    }}
                                    className={"comment-profile-buttons body2 underlined"}
                                >
                                    Editar
                                </button>
                            )}
                        </div>
                        <p className={"body1"}>{commentText}</p>
                        <button
                            onClick={() => {
                                navigate(`post/${postId}`)
                            }}
                            className={"comment-profile-buttons body2 underlined"}
                        >
                            {commentsAmount} Comentarios
                        </button>
                    </div>
                    {!owner && (
                        <div className="like-dislike-div">
                            <LikeButton
                                initialLiked={isLiked}
                                likeAmount={likeAmt}
                                onClick={() => handleLike(id)}
                            />
                            <DislikeButton
                                initialDisliked={isDisliked}
                                dislikeAmount={dislikeAmt}
                                onCLick={() => handleDislike(id)}
                            />
                        </div>
                    )}
                </div>
                {showModal && (
                    <TextInputModal
                        title={"Actualizar Comentario."}
                        firstButton="Cancelar"
                        secondButton="Actualizar"
                        firstButtonAction={() => {
                            setShowModal(false)
                            setUpdateValue(commentText)
                        }}
                        secondButtonAction={() => {
                            handleUpdateComment(updateValue)
                            setShowModal(false)
                        }}
                        initialValue={updateValue}
                        handleInputChange={handleInputChange}
                    ></TextInputModal>
                )}
            </div>
        </div>
    )
}
export default withToast(Comment)
