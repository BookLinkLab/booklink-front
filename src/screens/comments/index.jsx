import "./styles.css"
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../../components/Comment"
import AddPost from "../../components/AddPost"
import React, { useEffect, useState } from "react"
import LikeButton from "../../components/LikeButton"
import DislikeButton from "../../components/DislikeButton"
import ChevronLeft from "../../assets/icons/chevronLeft"
import { getForum } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import withToast from "../../hoc/withToast"

const CommentsScreen = ({ showToast }) => {
    const { token } = useCurrentUser()
    const navigate = useNavigate()
    const { commentId } = useParams()
    const { forumId } = useParams()
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})

    useEffect(() => {
        setLoading(true)
        getForumData().then(() => {
            setLoading(false)
        })
    }, [])

    const getForumData = async () => {
        const response = await getForum(token, forumId)
        if (response.status === 200) {
            setForum(response.data)
        } else {
            showToast("Error al cargar el foro", "error")
            navigate("/home")
        }
    }

    const comment2 = {
        username: "pepe",
        commentDate: "10/2/90",
        commentText: "hjsdbfnejsdabnfdmsbf dmsnfb dmfbajhdmsbj",
    }

    const comment3 = {
        username: "jnflkasnfd",
        commentDate: "10/2/90",
        commentText:
            "Lorem ipsum dolor sit amet consectetur. Quisque quis sed scelerisque quam praesent. Pulvinar aaa s hendrerit at ut arcu cursus dignissim diam vitae gravida. Nulla lectus viverra vitae nulla. Rhoncus pulvinar tortor aliquam et ut sit molestie quam. Tortor viverra porttitor aenean integer eget. Iaculis venenatis vel egestas non natoque ipsum consequat. Pulvinar ante malesuada non ornare.",
    }

    const comment4 = {
        username: "jnflkasnfd",
        commentDate: "10/2/90",
        commentText:
            "Lorem ipsum dolor sit amet consectetur. Quisque quis sed scelerisque quam praesent. Pulvinar aaa s hendrerit at ut arcu cursus dignissim diam vitae gravida. Nulla lectus viverra vitae nulla. Rhoncus pulvinar tortor aliquam et ut sit molestie quam. Tortor viverra porttitor aenean integer eget. Iaculis venenatis vel egestas non natoque ipsum consequat. Pulvinar ante malesuada non ornare.",
    }

    const comment5 = {
        username: "jnflkasnfd",
        commentDate: "10/2/90",
        commentText:
            "Lorem ipsum dolor sit amet consectetur. Quisque quis sed scelerisque quam praesent. Pulvinar aaa s hendrerit at ut arcu cursus dignissim diam vitae gravida. Nulla lectus viverra vitae nulla. Rhoncus pulvinar tortor aliquam et ut sit molestie quam. Tortor viverra porttitor aenean integer eget. Iaculis venenatis vel egestas non natoque ipsum consequat. Pulvinar ante malesuada non ornare.",
    }

    const comment6 = {
        username: "jnflkasnfd",
        commentDate: "10/2/90",
        commentText:
            "Lorem ipsum dolor sit amet consectetur. Quisque quis sed scelerisque quam praesent. Pulvinar aaa s hendrerit at ut arcu cursus dignissim diam vitae gravida. Nulla lectus viverra vitae nulla. Rhoncus pulvinar tortor aliquam et ut sit molestie quam. Tortor viverra porttitor aenean integer eget. Iaculis venenatis vel egestas non natoque ipsum consequat. Pulvinar ante malesuada non ornare.",
    }

    const comments = [comment2, comment3, comment4, comment5, comment6]

    /* TODO : bring comments del back con el commentId y datos del foro (imagen y nombre) con el forumId */

    const comment = {
        username: "valentina",
        commentDate: "10/2/90",
        commentText:
            "Lorem ipsum dolor sit amet consectetur. Quisque quis sed scelerisque quam praesent. Pulvinar hendrerit at ut arcu cursus dignissim diam vitae gravida. Nulla lectus viverra vitae nulla. Rhoncus pulvinar tortor aliquam et ut sit molestie quam. Tortor viverra porttitor aenean integer eget. Iaculis venenatis vel egestas non natoque ipsum consequat. Pulvinar ante malesuada non ornare.",
        commentsAmount: "10",
    }

    return (
        <>
            <div className="forum-name-img">
                <ChevronLeft onClick={() => navigate(`/forum/${forumId}`)} />
                <img className="forumImage" src={forum.img} alt="header-forum" />
                <h6 className="bold forum-title">{forum.title}</h6>
            </div>
            <div className="commentContainer">
                <div className="mainComment">
                    <Comment
                        username={comment.username}
                        commentDate={comment.commentDate}
                        commentText={comment.commentText}
                        commentsAmount={comment.commentsAmount}
                    ></Comment>
                </div>
                {comments.map((item) => (
                    <div className="commentsOfComment">
                        <Comment
                            commentText={item.commentText}
                            username={item.username}
                            commentDate={item.commentDate}
                            className="smaller-comments"
                        />
                    </div>
                ))}
            </div>
            <div className="add-post-style">
                <AddPost buttonText={"Comentar"} textFieldPlaceholder={"Comparte tus ideas..."} />
            </div>
        </>
    )
}

export default withToast(CommentsScreen)
