import React, { useState } from "react"
import HeaderForum from "../../components/HeaderForum/HeaderForum"
import { getForum } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useParams } from "react-router-dom"

export const Forum = async () => {
    const { id } = useParams()

    const forum = await getForum(id, useCurrentUser().token)

    const isOwner = useCurrentUser().id === forum.ownerId

    const [loading, setLoading] = useState(false)

    return (
        <>
            <HeaderForum
                title={forum.title}
                description={forum.description}
                image={forum.image}
                owner={isOwner}
                membersQuantity={forum.membersQuantity}
                tags={forum.tags.map((tag) => tag.name)}
            />
        </>
    )
}

export default Forum
