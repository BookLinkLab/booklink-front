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
}) => {
    const seenChecker = isSeen ? "notificationContainer seen" : "notificationContainer"
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const { token } = useCurrentUser()

    const handleClickOnDeleteButton = () => {
        setOpenModal(true)
    }

    const handleDeleteNotification = async () => {
        setLoading(true)
        try {
            const response = await deleteNotification(token, id)
            if (response.status === 200) {
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
                        <Button variant="ghost" onClick={handleClickOnDeleteButton}>
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
                    secondButtonAction={handleDeleteNotification}
                    handleOnClose={() => setOpenModal(undefined)}
                ></Modal>
            )}
        </div>
    )
}

export default withToast(Notification)
