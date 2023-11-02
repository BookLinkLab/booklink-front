import React, { useState } from "react"
import "./styles.css"
import Button from "../Button"
import "bootstrap-icons/font/bootstrap-icons.css"
import Modal from "../Modal"
import { deleteNotification } from "../../service/apis"
import withToast from "../../hoc/withToast"

const Notification = ({ forumImg, forumName, posterName, isSeen = true, showToast }) => {
    const seenChecker = isSeen ? "notificationContainer seen" : "notificationContainer"
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        if (!isSeen) {
            console.log("redirection")
        }
    }

    const handleClickOnDeleteButton = () => {
        setOpenModal(true)
    }

    const handleDeleteNotification = async () => {
        setLoading(true)
        try {
            const response = await deleteNotification()
            if (response.status === 200) {
                showToast(response.data, "success")
            } else {
                showToast(response.data, "error")
            }
        } finally {
            setLoading(false)
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
                    <Button variant="ghost" onClick={handleClickOnDeleteButton}>
                        <i class="bi bi-trash-fill red"></i>
                    </Button>
                </div>
            </div>
            {!!openModal && (
                <Modal
                    title="Eliminar notificación"
                    subtitle="¿Estás seguro de que deseas eliminar esta notificación?"
                    firstButtonText="Cancelar"
                    firstButtonAction={() => setOpenModal(false)}
                    secondButtonText="Eliminar"
                    secondButtonAction={handleDeleteNotification}
                    handleOnClose={() => setOpenModal(undefined)}
                ></Modal>
            )}
        </div>
    )
}

export default withToast(Notification)
