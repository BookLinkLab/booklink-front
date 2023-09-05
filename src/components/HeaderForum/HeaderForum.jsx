import React from "react"
import Button from "../Button"
import "./styles.css"

const HeaderForum = ({ title, description, image, owner, membersQuantity, tags }) => {
    return (
        <div className="headerForum">
            <img className="forumImage" src={image} alt="header-forum" />
            <div className="forumHeaders">
                <h5 className="header">{title}</h5>
                <text>{description}</text>
            </div>
            {owner ? (
                <div className="headerForumButtonContainer">
                    <Button className="headerForumButton" variant="outlined" size="small">
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
            {/* tags and members missing*/}
        </div>
    )
}

export default HeaderForum
