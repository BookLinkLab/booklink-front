import React from "react"
import Navbar from "../../components/navbar"
import NotFoundSVG from "../../assets/icons/notFoundSVG"
import { useNavigate } from "react-router-dom"
import "./styles.css"
import Button from "../../components/Button"

const NotFound = ({ isLogged }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        isLogged ? navigate("/home") : navigate("/login")
    }

    return (
        <>
            <div className="notFoundContainer">
                <NotFoundSVG />
                <p style={{ marginTop: 30 }}>
                    <div style={{ fontWeight: "bold" }}>Oops!</div>
                    <div style={{ marginTop: 7 }}>Esa pagina no existe</div>
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
