import "./styles.css"
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../../components/Comment"
import AddPost from "../../components/AddPost"
import React, { useEffect, useState } from "react"
import LikeButton from "../../components/LikeButton"
import DislikeButton from "../../components/DislikeButton"
import ChevronLeft from "../../assets/icons/chevronLeft"
import { getForum, getPostInfo, postComment } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import withToast from "../../hoc/withToast"

const CommentsScreen = ({ showToast }) => {
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const { commentId } = useParams()
    const { forumId } = useParams()
    const [addedComment, setAddComment] = useState(false)
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})

    const [postInfo, setPostInfo] = useState({
        content: "",
        username: "",
        user_id: "",
        createdDate: "",
        comments: [],
        likes: [],
        dislikes: [],
        isLiked: false,
        isDisliked: false,
    })

    const getForumData = async () => {
        const response = await getForum(token, forumId)
        if (response.status === 200) {
            setForum(response.data)
        } else {
            showToast("Error al cargar el foro", "error")
            navigate("/home")
        }
    }

    const getPostData = async () => {
        //Está puesto en 1 para mockearlo
        const response = await getPostInfo(token, 1)
        console.log(response)
        if (response.status === 200) {
            //mock likes and dislikes
            const likes = ["1", "2", "3", "4", "10", "11", "12"]
            const dislikes = ["5", "6", "7", "8", "10"]
            const newPostInfo = {
                content: response.data.content,
                username: response.data.user.username,
                user_id: response.data.user.id,
                createdDate: response.data.createdDate,
                comments: response.data.comments,
                likes: likes,
                dislikes: dislikes,
                isLiked: likes.includes(id),
                isDisliked: dislikes.includes(id),
            }
            setPostInfo(newPostInfo)
        } else {
            navigate(`*`)
        }
    }
    useEffect(() => {
        setLoading(true)
        getPostData().then(() => {})
        getForumData().then(() => {
            setLoading(false)
        })
    }, [addedComment])

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

    const handlePostComment = (content) => {
        setLoading(true)
        postComment(token, 1, content)
            .then((response) => {
                if (response.status === 201) {
                    showToast(`Se agregó el siguiente comentario: "${content}"`, "success")
                } else {
                    showToast(`No se agregó el siguiente comentario: "${content}"`, "error")
                }
            })
            .finally(() => {
                setLoading(false)
                setAddComment(!addedComment)
            })
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
                        username={postInfo.username}
                        commentDate={postInfo.createdDate}
                        commentText={postInfo.content}
                        commentsAmount={postInfo.comments.length}
                        owner={postInfo.user_id === id}
                        isLiked={postInfo.isLiked}
                        isDisliked={postInfo.isDisliked}
                        likeAmt={postInfo.likes.length}
                        dislikeAmt={postInfo.dislikes.length}
                    ></Comment>
                </div>
                {postInfo.comments.map((item) => (
                    <div className="commentsOfComment">
                        <Comment
                            commentText={item.content}
                            username={item.userId}
                            commentDate={item.createdDate}
                            className="smaller-comments"
                        />
                    </div>
                ))}
            </div>
            <div className="add-post-style">
                <AddPost
                    buttonText={"Comentar"}
                    textFieldPlaceholder={"Comparte tus ideas..."}
                    onSubmit={(comment) => handlePostComment(comment)}
                />
            </div>
        </>
    )
}

export default withToast(CommentsScreen)
