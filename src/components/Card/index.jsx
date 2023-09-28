import "./styles.css"
import Button from "../Button"
import { useNavigate } from "react-router-dom"
import Members from "../Members"
import Chip from "../Chip"

const Card = ({ image, text, chips, members, joined, id, buttonAction }) => {
    const navigate = useNavigate()

    return (
        <div className="card-main-div" onClick={() => navigate(`/forum/${id}`)}>
            <img src={image} className="card-image" alt="card" />
            <div className="card-sub-div">
                <div className="text-card-div">
                    <h6 className="text-card">
                        <b>{text}</b>
                    </h6>
                    <div className="chips-card-div">
                        {chips.map((chip, index) => (
                            <Chip key={index} tag={chip.name}></Chip>
                        ))}
                    </div>
                </div>
                <div className="button-card-div">
                    <div className="members-card-div">
                        <Members amtOfUsers={members} />
                    </div>
                    <Button
                        size="small"
                        disabled={joined}
                        onClick={() => {
                            buttonAction()
                        }}
                    >
                        {joined ? "Unido" : "Unirse"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Card
