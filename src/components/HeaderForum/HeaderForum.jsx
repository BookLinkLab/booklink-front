import React from "react"
import Button from "../Button"

const HeaderForum = ({ title, description, image, owner, membersQuantity, tags }) => {
    return (
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "center" }}>
            <div>
                <img src={image} alt="header-forum" />
            </div>
            <div style={{ width: 581, marginLeft: 32, marginRight: 40 }}>
                <h5 className="bold">{title}</h5>
                <text>{description}</text>
            </div>
            <div>
                {owner ? (
                    <div style={{ display: "flex", gap: "10px", flexDirection: "column" }}>
                        <Button variant="outlined" size="small">
                            Editar
                        </Button>
                        <Button size="small">Eliminar</Button>
                    </div>
                ) : (
                    <Button size="small">Abandonar</Button>
                )}
            </div>
            {/* tags and members missing*/}
        </div>
    )
}

export default HeaderForum
