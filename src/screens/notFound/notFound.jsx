import React from "react"
import Navbar from "../../components/navbar"
import NotFoundSVG from "../../assets/icons/notFoundSVG"
import { useNavigate } from "react-router-dom"
import "./styles.css"

const NotFound = ({ isLogged }) => {
    const navigate = useNavigate()

    const handleClick = () => {
        isLogged ? navigate("/home") : navigate("/login")
    }

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div style={{ textAlign: "center" }} className="notFoundContainer">
                <NotFoundSVG />
                <p style={{ marginTop: 30 }}>
                    <div style={{ fontWeight: "bold" }}>Oops!</div>
                    <div style={{ marginTop: 7 }}>Esa pagina no existe</div>
                </p>
                <button onClick={handleClick} style={{ marginTop: 34 }}>
                    Ir a inicio
                </button>
            </div>
        </>
    )
}

export default NotFound
