import React, { useEffect, useState } from "react"
import HeaderForum from "../../components/HeaderForum"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useNavigate, useParams } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import AddPost from "../../components/AddPost"
import "./styles.css"
import { getForum, addPostToForum, getPosts } from "../../service/apis"
import Comment from "../../components/Comment"
import Notification from "../../components/Notification"
import Background from "../../assets/images/background.png"

const Forum = ({ showToast }) => {
    const { forumId } = useParams()
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})
    const [posts, setPosts] = useState([])
    const [comment, setComment] = useState("")

    useEffect(() => {
        setLoading(true)
        getForumData().then()
        setLoading(false)
    }, [forum.searcherIsMember])

    const getForumData = async () => {
        const response = await getForum(token, forumId)
        if (response.status === 200) {
            setForum(response.data)
        } else {
            showToast("Error al cargar el foro", "error")
            navigate("/home")
        }
    }

    const handleAddPost = async (content) => {
        try {
            setLoading(true)
            const response = await addPostToForum(token, forumId, content)
            if (response.status === 200) {
                showToast(response.data, "success")
            } else {
                showToast(response.data, "error")
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        setLoading(true)
        getPostsData().then()
        setLoading(false)
    }, [forumId, posts.length])

    const getPostsData = async () => {
        const response = await getPosts(token, forumId)
        if (response.status === 200) {
            setPosts(response.data.reverse())
        } else {
            showToast(response.data, "error")
            navigate("/home")
        }
    }

    return (
        <>
            <Loader open={loading} />
            <HeaderForum
                id={forumId}
                title={forum.title}
                description={forum.description}
                image={forum.img}
                owner={forum.ownerId == id}
                forumOwner={forum.ownerId == id}
                amtOfUsers={forum.members}
                tags={forum.tags}
                isMember={forum.searcherIsMember}
                setForumData={setForum}
            />
            {forum.searcherIsMember && (
                <>
                    <div className="addPostContainer">
                        <AddPost
                            textFieldPlaceholder={"Comparte tus ideas"}
                            onClick={handleAddPost}
                            buttonText={"Crear publicación"}
                            onSubmit={(comment) => handleAddPost(comment).then(getPostsData)}
                        />
                    </div>
                    <div className="postsContainer">
                        {posts.map((post) => (
                            <Comment
                                commentText={post.content}
                                username={post.user.username}
                                userId={post.user.id}
                                commentDate={post.date}
                                isPost={true}
                                owner={post.user.id == id}
                                id={post.id}
                                refresh={() => getPostsData()}
                                key={post.id}
                                isRedirectionable
                                commentsAmount={post.commentsCount}
                                updatedDate={post.updatedDate}
                                likeAmt={post.likes.length}
                                dislikeAmt={post.dislikes.length}
                                forumOwner={forum.ownerId == id}
                                isLiked={post.likes.includes(parseInt(id))}
                                isDisliked={post.dislikes.includes(parseInt(id))}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default withToast(Forum)
