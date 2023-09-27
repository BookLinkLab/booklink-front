import React, { useState } from "react"
import Button from "../Button"
import "./styles.css"
import Chip from "../Chip"
import Members from "../Members"
import Loader from "../../components/Loader"
import withToast from "../../hoc/withToast"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { deleteForum, joinForum, leaveForum } from "../../service/apis"
import { useNavigate } from "react-router-dom"

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

    const handleDelete = async () => {
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
                        <Button className="headerForumButton" size="small" onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </div>
                ) : (
                    <div className="headerForumButtonContainer">
                        <Button
                            className="headerForumButton"
                            size="small"
                            onClick={isMember ? clickLeaveForum : handleJoinForum}
                        >
                            {isMember ? "Abandonar" : "Unirse"}
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}

export default withToast(HeaderForum)
