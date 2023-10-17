import "./styles.css"
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../../components/Comment"
import AddPost from "../../components/AddPost"
import React, { useEffect, useState } from "react"
import ChevronLeft from "../../assets/icons/chevronLeft"
import { deletePost, getForum, getPostInfo } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import withToast from "../../hoc/withToast"
import Modal from "../../components/Modal"

const CommentsScreen = ({ showToast }) => {
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const { commentId } = useParams()
    const { forumId } = useParams()
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        setLoading(true)
        getForumData().then(() => {
            setLoading(false)
        })
    }, [])

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

    const handleDelete = async () => {
        setOpenModal(true)
        try {
            const response = await deletePost(token, commentId)
            showToast(response.data, "success")
            console.log()
        } catch (error) {
            showToast(error.response, "error")
        }
    }

    const getPostData = async () => {
        //Está puesto en 1 para mockearlo
        const response = await getPostInfo(token, 1)
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
    }, [])

    return (
        <>
            <div className="forum-name-img">
                <ChevronLeft onClick={() => navigate(`/forum/${forumId}`)} />
                <img className="forumImage" src={forum.img} alt="header-forum" />
                <h6 className="bold forum-title">{forum.title}</h6>
            </div>
            {!!openModal && (
                <Modal
                    className={"delete-comment-modal"}
                    showModal={!!openModal}
                    setShowModal={setOpenModal}
                    firstButtonText={"Cancelar"}
                    title={"Eliminar Comentario"}
                    subtitle={"¿Estás seguro que deseas eliminar este comentario?"}
                    secondButtonText={"Eliminar"}
                    handleOnClose={() => setOpenModal(undefined)}
                    firstButtonAction={() => setOpenModal(undefined)}
                    secondButtonAction={handleDelete}
                />
            )}
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
                        handleDelete={handleDelete}
                        comments={postInfo.comments}
                    ></Comment>
                </div>
                {comments.map((item) => (
                    <div className="commentsOfComment">
                        <Comment
                            commentText={item.commentText}
                            username={item.username}
                            commentDate={item.commentDate}
                            className="smaller-comments"
                            handleDelete={handleDelete}
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
