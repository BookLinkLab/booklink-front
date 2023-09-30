import { ThumbUp } from "../../assets/icons/thumbUp"
import React, { useEffect, useState } from "react"
import "./styles.css"

const LikeButton = ({ initialLiked }) => {
    const [liked, setLiked] = useState(initialLiked)
    const likeAmount = 12

    const likeButtonAction = () => {
        setLiked(!liked)
    }

    useEffect(() => {
        setLiked(initialLiked)
    }, [initialLiked])

    return (
        <div className="likeButtonContainer">
            <button className={"likeButton " + (liked && "liked")} onClick={likeButtonAction}>
                <ThumbUp width={16} height={16} color={liked ? "#70BE7C" : "#747F86"} />
            </button>
            <p className={"body2"}>{likeAmount}</p>
        </div>
    )
}

export default LikeButton
