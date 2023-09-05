import React from "react"
import Button from "../Button"
import "./styles.css"

const HeaderForum = ({ title, description, image, owner, membersQuantity, tags }) => {
    return (
        <div className="headerForum">
            <img className="forumImage" src={image} alt="header-forum" />
            <div style={{ width: 581, marginLeft: 32, marginRight: 40 }}>
                <h5 className="bold">{title}</h5>
                <text>{description}</text>
            </div>
            {owner ? (
                <div className="headerForumButtonContainer">
                    <Button variant="outlined" size="small">
                        Editar
                    </Button>
                    <Button size="small">Eliminar</Button>
                </div>
            ) : (
                <div className="headerForumButtonContainer">
                    <Button size="small">Abandonar</Button>
                </div>
            )}
            {/* tags and members missing*/}
        </div>
    )
}

export default HeaderForum
