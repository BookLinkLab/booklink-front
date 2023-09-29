import React, { useEffect, useState } from "react"
import HeaderForum from "../../components/HeaderForum"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useNavigate, useParams } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import { getForum, leaveForum } from "../../service/apis"
import AddPost from "../../components/AddPost"

const Forum = ({ showToast }) => {
    const { forumId } = useParams()
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})

    useEffect(() => {
        setLoading(true)
        getForumData().then()
        setLoading(false)
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

    const clickLeaveForum = async () => {
        setLoading(true)
        try {
            const resp = await leaveForum(token, forum.id)
            if (resp.status === 200) {
                showToast(resp.body, "success")
                navigate("/home")
            } else {
                showToast(resp.body, "error")
            }
        } finally {
            setLoading(false)
        }
    }

    const handleAddPost = () => {}

    return (
        <>
            <Loader open={loading} />
            <HeaderForum
                id={forumId}
                title={forum.title}
                description={forum.description}
                image={forum.img}
                owner={forum.ownerId == id}
                amtOfUsers={forum.members}
                tags={forum.tags}
            />
            <div style={{ marginTop: 98 }}>
                <AddPost
                    textFieldPlaceholder={"Comparte tus ideas"}
                    onClick={handleAddPost}
                    buttonText={"Crear publicacion"}
                />
            </div>
        </>
    )
}

export default withToast(Forum)
