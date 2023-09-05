import React, { useState } from "react"
import HeaderForum from "../../components/HeaderForum/HeaderForum"
import { getForum } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useParams } from "react-router-dom"

const Forum = () => {
    // const { id } = useParams();
    //
    // const forum = await getForum(id, useCurrentUser().token);
    //
    // const isOwner = useCurrentUser().id === forum.ownerId;

    const mock = {
        image: "https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg",
        title: "el pepe",
        description: "el pepe hbdsbvbdc",
        membersQuantity: 48,
        tags: ["Tag 1", "Tag 2", "Tag 3"],
    }

    return (
        <>
            {/*<HeaderForum*/}
            {/*    title={forum.title}*/}
            {/*    description={forum.description}*/}
            {/*    image={forum.image}*/}
            {/*    owner={isOwner}*/}
            {/*    membersQuantity={forum.membersQuantity}*/}
            {/*    tags={forum.tags.map((tag) => tag.name)}*/}
            {/*/>*/}
            <HeaderForum
                title={mock.title}
                description={mock.description}
                image={mock.image}
                owner={true}
                membersQuantity={mock.membersQuantity}
                tags={mock.tags.map((tag) => tag.name)}
            />
        </>
    )
}

export default Forum
