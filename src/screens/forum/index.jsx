import React, { useEffect, useState } from "react"
import HeaderForum from "../../components/HeaderForum"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useNavigate, useParams } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import { getForum } from "../../service/apis"
import AddPost from "../../components/AddPost"
import "./styles.css"

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
                isMember={forum.searcherIsMember}
                setForumData={setForum}
            />
            <div className="addPostContainer">
                <AddPost
                    textFieldPlaceholder={"Comparte tus ideas"}
                    onClick={() => {}} //aca iria la funcion que añade el post
                    buttonText={"Crear publicacion"}
                />
            </div>
        </>
    )
}

export default withToast(Forum)
