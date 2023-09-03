import "./styles.css"
import Button from "../Button"
import { useNavigate } from "react-router-dom"

const Card = ({ image, text, chips, members }) => {
    const navigate = useNavigate()

    return (
        <div className="card-main-div" onClick={() => navigate("/forum")}>
            <img src={image} className="card-image" alt="card-image"></img>
            <div className="card-sub-div">
                <div className="text-card-div">
                    <h6 className="text-card">
                        <b>{text}</b>
                    </h6>
                    <div className="chips-card-div">{chips}</div>
                </div>
                <div className="button-card-div">
                    <div className="members-card-div">{members}</div>
                    <Button
                        size="small"
                        onClick={(event) => {
                            event.stopPropagation()
                            navigate("/home")
                        }}
                    >
                        Unirse
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Card
