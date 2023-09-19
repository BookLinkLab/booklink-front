import React, { useState } from "react"
import HeaderForum from "../../components/HeaderForum"
import { getForum } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useNavigate, useParams } from "react-router-dom"
import { Chip } from "@mui/material"
import { leaveForum } from "../../service/apis"
import withToast from "../../hoc/withToast"

const Forum = ({ showToast }) => {
    const navigate = useNavigate()
    const token = useCurrentUser()
    // const { id } = useParams();
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
            <HeaderForum
                title={mock.title}
                description={mock.description}
                image={mock.image}
                owner={true}
                amtOfUsers={mock.amtOfUsers}
                tags={mock.tags}
            />
        </>
    )
}

export default withToast(Forum)
