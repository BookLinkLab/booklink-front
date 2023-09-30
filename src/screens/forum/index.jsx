import React, { useEffect, useState } from "react"
import HeaderForum from "../../components/HeaderForum"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useNavigate, useParams } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import { getForum, leaveForum } from "../../service/apis"
import { ThumbDown } from "../../assets/icons/thumbDown"
import { ThumbUp } from "../../assets/icons/thumbUp"
import LikeButton from "../../components/LikeButton"
import DislikeButton from "../../components/DislikeButton"

const Forum = ({ showToast }) => {
    const { forumId } = useParams()
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})
    const [liked, setLiked] = useState(false)
    const [disliked, setDisliked] = useState(false)
    const likeAmount = 12
    const dislikeAmount = 12

    const mockLikes = [1, 2, 3, 4]
    const mockDislikes = [5, 6, 7, 8]

    const userHasLiked = mockLikes.includes(parseInt(id))
    const userHasDisliked = mockDislikes.includes(parseInt(id))

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

            {/*<br />*/}
            {/*<div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>*/}
            {/*    <LikeButton initialLiked={userHasLiked} />*/}
            {/*</div>*/}
            {/*<br />*/}
            {/*<div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>*/}
            {/*    <DislikeButton initialDisliked={userHasDisliked}/>*/}
            {/*</div>*/}
        </>
    )
}

export default withToast(Forum)
