import React, { useEffect, useState } from "react"
import HeaderForum from "../../components/HeaderForum"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useNavigate, useParams } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"

const Forum = ({ showExternalToast }) => {
    const { forumId } = useParams()
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})

    useEffect(() => {
        setLoading(true)
        getForumData()
        setLoading(false)
    }, [])

    const getForumData = async () => {
        const response = await getForum(token, forumId)
        if (response.status === 200) {
            setForum(response.data)
            console.log(response.data.owner)
        } else {
            showExternalToast("Error al cargar el foro")
            navigate("/home")
        }
    }

    return (
        <>
            <Loader open={loading} />
            <HeaderForum
                title={forum.title}
                description={forum.description}
                image={forum.img}
                owner={forum.owner === id}
                amtOfUsers={forum.members}
                tags={forum.tags}
            />
        </>
    )
}

export default withToast(Forum)
