import React, { useState } from "react"
import Button from "../Button"
import "./styles.css"
import Chip from "../Chip"
import Members from "../Members"
import Loader from "../../components/Loader"
import withToast from "../../hoc/withToast"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { deleteForum } from "../../service/apis"
import { useNavigate } from "react-router-dom"

const HeaderForum = ({ title, description, image, owner, amtOfUsers, tags, id, showToast }) => {
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
                        {tags.map((tag, index) => (
                            <Chip key={index} tag={tag} />
                        ))}
                    </div>
                </div>
                {owner ? (
                    <div className="headerForumButtonContainer">
                        <Button className="headerForumButton" variant="outlined" size="small">
                            Editar
                        </Button>
                        <Button className="headerForumButton" size="small" onClick={handleDelete}>
                            Eliminar
                        </Button>
                    </div>
                ) : (
                    <div className="headerForumButtonContainer">
                        <Button className="headerForumButton" size="small">
                            Abandonar
                        </Button>
                    </div>
                )}
            </div>
        </>
    )
}

export default withToast(HeaderForum)
