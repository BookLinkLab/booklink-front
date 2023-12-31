import React from "react"
import NotFoundSVG from "../../assets/icons/notFoundSVG"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import Button from "../../components/Button"
import { useCurrentUser } from "../../hooks/useCurrentUser"

const NotFound = () => {
    const navigate = useNavigate()
    const { isAuthenticated } = useCurrentUser()

    const handleClick = () => {
        isAuthenticated() ? navigate("/home") : navigate("/login")
    }

    return (
        <>
            <div className="notFoundContainer">
                <NotFoundSVG />
                <p className="custom-heading-container">
                    <h4 className="bold custom-heading">Oops!</h4>
                    <h6 className="custom-heading">Esa página no existe</h6>
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 30,
                    }}
                >
                    <Button variant={"outlined"} size={"large"} onClick={handleClick}>
                        Ir a inicio
                    </Button>
                </div>
            </div>
        </>
    )
}

export default NotFound
