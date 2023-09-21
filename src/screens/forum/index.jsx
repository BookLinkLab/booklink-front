import React, { useState } from "react"
import HeaderForum from "../../components/HeaderForum"
import { getForum } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useParams } from "react-router-dom"
import { Chip } from "@mui/material"

const Forum = () => {
    const { id } = useParams()
    //
    // const forum = await getForum(id, useCurrentUser().token);
    //
    // const isOwner = useCurrentUser().id === forum.ownerId;

    const mock = {
        image: "https://www.tooltyp.com/wp-content/uploads/2014/10/1900x920-8-beneficios-de-usar-imagenes-en-nuestros-sitios-web.jpg",
        title: "el pepe",
        description:
            "Somos un grupo apasionado de entusiastas de Percy Jackson y todo el maravilloso universo creado por Rick Riordan. Si te encanta sumergirte en las aventuras épicas de semidioses, monstruos mitológicos y la magia del Olimpo, este es el lugar perfecto para ti.",
        amtOfUsers: 48,
        tags: ["Tag 1", "Tag 2", "Tag 3"],
    }

    return (
        <>
            <HeaderForum
                title={mock.title}
                description={mock.description}
                image={mock.image}
                owner={true}
                amtOfUsers={mock.amtOfUsers}
                tags={mock.tags}
                id={id}
            />
        </>
    )
}

export default Forum
