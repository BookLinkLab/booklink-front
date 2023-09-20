import React from "react"
import Button from "../Button"
import "./styles.css"
import Chip from "../Chip"
import Members from "../Members"
import { useNavigate, useParams } from "react-router-dom"

const HeaderForum = ({ title, description, image, owner, amtOfUsers, tags }) => {
    const navigate = useNavigate()
    const { forumId } = useParams()

    return (
        <div className="headerForum">
            <img className="forumImage" src={image} alt="header-forum" />
            <div className="forumHeaders">
                <h4 className="header">{title}</h4>
                <div className="description">
                    <p>{description}</p>
                </div>
                <Members amtOfUsers={amtOfUsers} />
                <div className="tags">
                    {tags ? (
                        tags.map((tag, index) => <Chip key={index} tag={tag.name} />)
                    ) : (
                        <p>No tags available</p>
                    )}
                </div>
            </div>
            {owner ? (
                <div className="headerForumButtonContainer">
                    <Button
                        className="headerForumButton"
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/editForum/${forumId}`)}
                    >
                        Editar
                    </Button>
                    <Button className="headerForumButton" size="small">
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
    )
}

export default HeaderForum
