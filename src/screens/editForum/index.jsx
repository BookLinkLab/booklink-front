import React, { useState } from "react"
import "./styles.css"
import CustomTextField from "../../components/TextField"
import Chip from "../../components/Chip"
import { editForum } from "../../service/apis"
import { Form, Formik } from "formik"
import Autocomplete from "../../components/Autocomplete"
import Button from "../../components/Button"
import * as Yup from "yup"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useNavigate, useParams } from "react-router-dom"
import withToast from "../../hoc/withToast"

export const Index = ({ showToast }) => {
    const { token } = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { forumId } = useParams()

    const validateSchema = Yup.object().shape({
        name: Yup.string().required("Este campo es requerido"),
        img: Yup.string().url().required("Este campo es requerido"),
        description: Yup.string().required("Este campo es requerido"),
        tags: Yup.array()
            .required("Este campo es requerido")
            .min(1, "Selecciona al menos una etiqueta"),
    })

    const mockData = {
        name: "Los Tomadores del Olimpo",
        description: "Foro para los tomadores del olimpo",
        img: "https://www.bookpedia.com/coomunityhttps://www.bookpedia.com/coomunity",
        tags: ["Humor", "Rayo", "Mitología"],
    }

    return (
        <>
            <Formik
                initialValues={{
                    name: mockData.name,
                    img: mockData.img,
                    description: mockData.description,
                    tags: mockData.tags.map((tag, index) => <Chip tag={tag} key={index} />),
                }}
                validationSchema={validateSchema}
                onSubmit={async ({ name, description, img }) => {
                    try {
                        setLoading(true)
                        const body = {
                            name,
                            description,
                            img,
                            tags,
                        }
                        const response = await editForum(token, body, forumId)
                        if (response.status === 200) {
                            navigate(`/forum/${forumId}`)
                        } else {
                            showToast(response.body, "error")
                        }
                    } finally {
                        setLoading(false)
                    }
                }}
            >
                {({ dirty }) => (
                    <Form className="editForumContainer">
                        <h4 className="bold">Editar Foro</h4>
                        <CustomTextField label="Nombre" placeholder={mockData.name} name="name" />
                        <CustomTextField
                            label="Link de la foto"
                            placeholder={mockData.image}
                            name="img"
                        />
                        <CustomTextField
                            label="Descripción"
                            placeholder={mockData.description}
                            name="description"
                        />
                        <Autocomplete
                            label="Etiquetas"
                            name="tags"
                            placeholder="Accion, Harry Potter, Romance..."
                            options={["Humor", "Rayo", "Mitología"]}
                            className="autocomplete"
                        />
                        <Button
                            className="create-button"
                            type="submit"
                            size="medium"
                            disabled={!dirty}
                        >
                            Editar
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default withToast(Index)
