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

const Forum = ({ showToast }) => {
    const { forumId } = useParams()
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})
    const [posts, setPosts] = useState([])

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
            setPosts(response.data)
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
                owner={forum.ownerId === id}
                amtOfUsers={forum.members}
                tags={forum.tags}
                isMember={forum.searcherIsMember}
                setForumData={setForum}
            />
            <div className="addPostContainer">
                <AddPost
                    textFieldPlaceholder={"Comparte tus ideas"}
                    onClick={handleAddPost}
                    buttonText={"Crear publicacion"}
                    onSubmit={(comment) => handleAddPost(comment)}
                />
            </div>
            <div className="postsContainer">
                {id === forum.ownerId &&
                    posts.map((post) => (
                        <Comment
                            commentText={post.content}
                            username={post.username}
                            commentDate={post.createdDate}
                            isPost={true}
                            id={post.id}
                        />
                    ))}
            </div>
        </>
    )
}

export default withToast(Forum)
