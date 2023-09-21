import React, { useEffect, useState } from "react"
import HeaderForum from "../../components/HeaderForum"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useNavigate, useParams } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import { getForum, leaveForum } from "../../service/apis"

const Forum = ({ showToast, showExternalToast }) => {
    const { forumId } = useParams()
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})

    //
    // const forum = await getForum(id, useCurrentUser().token);
    //
    // const isOwner = useCurrentUser().id === forum.ownerId;

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

    return (
        <>
            <Loader open={loading} />
            <HeaderForum
                id={forumId}
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
