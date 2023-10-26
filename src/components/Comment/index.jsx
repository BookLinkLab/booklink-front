import "./styles.css"
import React, { useState } from "react"
import { Ellipse } from "../../assets/icons/ellipse"
import "moment/locale/es"
import Moment from "react-moment"
import Modal from "../Modal"
import TextInputModal from "../TextInputModal"
import { updateComment, updatePost } from "../../service/apis"
import { useNavigate } from "react-router-dom"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import DislikeButton from "../../components/DislikeButton/index"
import LikeButton from "../../components/LikeButton/index"
import {
    dislikePost,
    likePost,
    deletePost,
    likeComment,
    dislikeComment,
    deleteComment,
} from "../../service/apis"
import withToast from "../../hoc/withToast"
import Loader from "../Loader"

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
    isRedirectionable,
    updatedDate,
}) => {
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [updateValue, setUpdateValue] = useState(commentText)
    const { token } = useCurrentUser()
    const [loading, setLoading] = useState(false)

    const handleUpdateComment = async (updatedCommentText) => {
        try {
            setLoading(true)
            const response = await updateComment(token, id, updatedCommentText)
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

    const handleInputChange = (value) => {
        setUpdateValue(value)
    }

    const handleUpdatePost = async (updatedPostText) => {
        try {
            setLoading(true)
            const response = await updatePost(token, id, updatedPostText)
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
    const handleDeletePost = async () => {
        try {
            setLoading(true)
            const response = isPost ? await deletePost(token, id) : await deleteComment(token, id)
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
        try {
            setLoading(true)
            const response = isPost ? await likePost(token, id) : await likeComment(token, id)
            if (response.status === 200) {
                showToast(response.data, "success")
                refresh()
            } else {
                showToast(response.data, "error")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleDislike = async () => {
        try {
            setLoading(true)
            const response = isPost ? await dislikePost(token, id) : await dislikeComment(token, id)
            if (response.status === 200) {
                showToast(response.data, "success")
                refresh()
            } else {
                showToast(response.data, "error")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Loader open={loading} />
            {!!openModal && (
                <Modal
                    className={"delete-comment-modal"}
                    showModal={!!openModal}
                    setShowModal={setOpenModal}
                    firstButtonText={"Cancelar"}
                    title={"Eliminar publicación"}
                    subtitle={"¿Estás seguro que deseas eliminar esta publicación?"}
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
                            {updatedDate == null ? "" : <p className="body2 bold">Editado</p>}
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
                        <p className={"body2"}>{commentText}</p>
                        {isPost ? (
                            isRedirectionable ? (
                                <button
                                    onClick={() => navigate(`post/${id}`)}
                                    className="comment-profile-buttons body2 underlined"
                                >
                                    {commentsAmount}{" "}
                                    {commentsAmount !== 1 ? "Comentarios" : "Comentario"}{" "}
                                </button>
                            ) : (
                                <p className="body2 bold">
                                    {commentsAmount}{" "}
                                    {commentsAmount !== 1 ? "Comentarios" : "Comentario"}
                                </p>
                            )
                        ) : (
                            ""
                        )}
                    </div>
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
                </div>
                {showModal && (
                    <TextInputModal
                        title={"Actualizar publicación."}
                        firstButton="Cancelar"
                        secondButton="Actualizar"
                        firstButtonAction={() => {
                            setShowModal(false)
                            setUpdateValue(commentText)
                        }}
                        secondButtonAction={() => {
                            !isPost
                                ? handleUpdateComment(updateValue)
                                : handleUpdatePost(updateValue)

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
