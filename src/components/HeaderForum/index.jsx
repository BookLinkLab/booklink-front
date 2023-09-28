import React, { useState } from "react"
import { createPortal } from "react-dom"
import Button from "../Button"
import "./styles.css"
import Chip from "../Chip"
import Members from "../Members"
import Loader from "../../components/Loader"
import withToast from "../../hoc/withToast"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { deleteForum, joinForum, leaveForum } from "../../service/apis"
import { useNavigate } from "react-router-dom"
import Modal from "../Modal"

const HeaderForum = ({
    title,
    description,
    image,
    owner,
    amtOfUsers,
    tags,
    id,
    showToast,
    isMember,
    setForumData,
}) => {
    const { token } = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false)

    const modalType = {
        delete: {
            title: "Eliminar foro",
            description: "¿Estás seguro que deseas eliminar este foro?",
        },
        leave: {
            title: "Abandonar foro",
            description: "¿Estás seguro que deseas abandonar este foro?",
        },
    }

    const handleDelete = async () => {
        setOpenModal(false)
        try {
            setLoading(true)
            await deleteForum(token, id)
            showToast("Foro eliminado correctamente", "success")
            navigate("/home")
        } catch (error) {
            if (error.response) {
                if (400 <= error.response.status <= 500) {
                    showToast(error.response.data, "error")
                }
            }
        } finally {
            setLoading(false)
        }
    }

    const clickLeaveForum = async () => {
        setOpenModal(false)
        setLoading(true)
        try {
            const resp = await leaveForum(token, id)
            if (resp.status === 200) {
                showToast(resp.data, "success")
                setForumData((prev) => ({ ...prev, searcherIsMember: resp.data.searcherIsMember }))
            } else {
                showToast(resp.data, "error")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = async () => {
        navigate(`/editForum/${id}`)
    }

    const handleJoinForum = async () => {
        setLoading(true)
        try {
            const resp = await joinForum(token, id)
            if (resp.status === 200) {
                showToast("Te has unido al foro correctamente", "success")
                setForumData((prev) => ({ ...prev, searcherIsMember: resp.data.searcherIsMember }))
            } else {
                showToast(resp.data, "error")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Loader open={loading} />
            <div className="headerForum">
                <img className="forumImage" src={image} alt="header-forum" />
                <div className="forumHeaders">
                    <h4 className="header">{title}</h4>
                    <div className="description">
                        <p>{description}</p>
                    </div>
                    <Members amtOfUsers={amtOfUsers} />
                    <div className="tags">
                        {tags?.map((tag, index) => (
                            <Chip key={index} tag={tag.name} />
                        ))}
                    </div>
                </div>
                {owner ? (
                    <div className="headerForumButtonContainer">
                        <Button
                            className="headerForumButton"
                            variant="outlined"
                            size="small"
                            onClick={handleEdit}
                        >
                            Editar
                        </Button>
                        <Button
                            className="headerForumButton"
                            size="small"
                            onClick={() => setOpenModal(modalType.delete)}
                        >
                            Eliminar
                        </Button>
                    </div>
                ) : (
                    <div className="headerForumButtonContainer">
                        <Button
                            className="headerForumButton"
                            size="small"
                            onClick={
                                isMember ? () => setOpenModal(modalType.leave) : handleJoinForum
                            }
                        >
                            {isMember ? "Abandonar" : "Unirse"}
                        </Button>
                    </div>
                )}
            </div>
            {createPortal(
                <>
                    {!!openModal && (
                        <Modal
                            showModal={!!openModal}
                            setShowModal={setOpenModal}
                            firstButtonText={"Cancelar"}
                            title={openModal.title}
                            subtitle={openModal.description}
                            secondButtonText={owner ? "Eliminar" : "Abandonar"}
                            handleOnClose={() => setOpenModal(undefined)}
                            firstButtonAction={() => setOpenModal(undefined)}
                            secondButtonAction={owner ? handleDelete : clickLeaveForum}
                        />
                    )}
                </>,
                document.body,
            )}
        </>
    )
}

export default withToast(HeaderForum)
