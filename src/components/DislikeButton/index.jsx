import { ThumbDown } from "../../assets/icons/thumbDown"
import { useEffect, useState } from "react"
import "./styles.css"

const DislikeButton = ({ initialDisliked, dislikeAmount, onCLick }) => {
    const [disliked, setDisliked] = useState(initialDisliked)

    const dislikeButtonAction = () => {
        setDisliked(!disliked)
    }

    useEffect(() => {
        setDisliked(initialDisliked)
    }, [initialDisliked])

    return (
        <div className="dislikeButtonContainer" onClick={dislikeButtonAction}>
            <button className={"dislikeButton " + (disliked && "disliked")} onClick={onCLick}>
                <ThumbDown width={16} height={16} color={disliked ? "#94313E" : "#747F86"} />
            </button>
            <p className={"body2"}>{dislikeAmount}</p>
        </div>
    )
}

export default DislikeButton
