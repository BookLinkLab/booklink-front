import { ThumbDown } from "../../assets/icons/thumbDown"
import { useEffect, useState } from "react"
import "./styles.css"

const DislikeButton = ({ initialDisliked, dislikeAmount, onCLick }) => {
    return (
        <div className="dislikeButtonContainer">
            <button
                className={"dislikeButton " + (initialDisliked && "disliked")}
                onClick={onCLick}
            >
                <ThumbDown width={16} height={16} color={initialDisliked ? "#94313E" : "#747F86"} />
            </button>
            <p className={"body2"}>{dislikeAmount}</p>
        </div>
    )
}

export default DislikeButton
