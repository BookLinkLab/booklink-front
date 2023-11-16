import React, { useState } from "react"
import "./styles.css"
import Button from "../Button"
import "bootstrap-icons/font/bootstrap-icons.css"
import Modal from "../Modal"
import { deleteNotification } from "../../service/apis"
import withToast from "../../hoc/withToast"
import DeleteNotification from "../../assets/icons/deleteNotification"
import { useCurrentUser } from "../../hooks/useCurrentUser"

const Notification = ({
    forumImg,
    content,
    forumName,
    authorName,
    isSeen = true,
    id,
    onClick,
    showToast,
    isProfile,
    postId,
    refetch,
}) => {
    const seenChecker = isSeen ? "notificationContainer seen" : "notificationContainer"
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const { token } = useCurrentUser()

    const handleClickOnDeleteButton = (event) => {
        event.stopPropagation()
        setOpenModal(true)
    }

    const handleDeleteNotification = async (event) => {
        event.stopPropagation()
        setLoading(true)
        try {
            const response = await deleteNotification(token, id)
            if (response.status === 200) {
                refetch && refetch()
                showToast(response.data, "success")
            } else {
                showToast(response.data, "error")
            }
        } finally {
            setLoading(false)
            setOpenModal(undefined)
        }
    }

    return (
        <div className={seenChecker} onClick={onClick}>
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
                {!isProfile && (
                    <div className="delete-button-style">
                        <Button
                            variant="ghost"
                            onClick={(event) => handleClickOnDeleteButton(event)}
                        >
                            <DeleteNotification height={24} width={24} />
                        </Button>
                    </div>
                )}
            </div>
            {!!openModal && (
                <Modal
                    className="modal-width"
                    title="Eliminar notificación"
                    subtitle="¿Estás seguro de que deseas eliminar esta notificación?"
                    firstButtonText="Cancelar"
                    firstButtonAction={() => setOpenModal(undefined)}
                    secondButtonText="Eliminar"
                    secondButtonAction={(event) => handleDeleteNotification(event)}
                    handleOnClose={(event) => {
                        event.stopPropagation()
                        setOpenModal(undefined)
                    }}
                ></Modal>
            )}
        </div>
    )
}

export default withToast(Notification)
