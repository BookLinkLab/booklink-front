import { ThumbDown } from "../../assets/icons/thumbDown"
import { useState } from "react"
import "./styles.css"

const DislikeButton = ({ initialDisliked }) => {
    const dislikeAmount = 12
    const [disliked, setDisliked] = useState(initialDisliked)

    const dislikeButtonAction = () => {
        setDisliked(!disliked)
    }

    return (
        <div className="dislikeButtonContainer">
            <button
                className={"dislikeButton " + (disliked && "disliked")}
                onClick={dislikeButtonAction}
            >
                <ThumbDown width={16} height={16} color={disliked ? "#94313E" : "#747F86"} />
            </button>
            <p className={"body2"}>{dislikeAmount}</p>
        </div>
    )
}

export default DislikeButton
