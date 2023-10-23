import "./styles.css"
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../../components/Comment"
import AddPost from "../../components/AddPost"
import React, { useEffect, useState } from "react"
import ChevronLeft from "../../assets/icons/chevronLeft"
import { getForum, getPostInfo } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import withToast from "../../hoc/withToast"

const CommentsScreen = ({ showToast }) => {
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const { postId, forumId } = useParams()
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
        const response = await getPostInfo(token, postId)
        if (response.status === 200) {
            //mock likes and dislikes
            const newPostInfo = {
                content: response.data.content,
                username: response.data.user.username,
                user_id: response.data.user.id,
                createdDate: response.data.createdDate,
                comments: response.data.comments,
                likes: response.data.likes || [], // Use an empty array if likes is undefined
                dislikes: response.data.dislikes || [],
                isLiked: (response.data.likes || []).includes(id),
                isDisliked: (response.data.dislikes || []).includes(id),
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
    }, [])

    return (
        <div className="main-container">
            <div className="title-img-container">
                <div className="forum-name-img">
                    <ChevronLeft onClick={() => navigate(`/forum/${forumId}`)} />
                    <img className="forumSmallImage" src={forum.img} alt="header-forum" />
                    <h6 className="bold forum-title">{forum.title}</h6>
                </div>
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
        </div>
    )
}

export default withToast(CommentsScreen)
