import React, { useEffect, useState } from "react"
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

export const EditForum = ({ showExternalToast }) => {
    const { token } = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { forumId } = useParams()

    const [modifiedValues, setModifiedValues] = useState({})
    const handleFieldChange = (fieldName, fieldValue) => {
        setModifiedValues({
            ...modifiedValues,
            [fieldName]: fieldValue,
        })
    }

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
        tags: [{ name: "Humor" }, { name: "Rayo" }, { name: "Mitología" }],
    }

    return (
        <>
            <Formik
                initialValues={{
                    name: mockData.name,
                    img: mockData.img,
                    description: mockData.description,
                    tags: mockData.tags.map((tag, index) => <Chip tag={tag.name} key={index} />),
                }}
                validationSchema={validateSchema}
                onSubmit={async (values) => {
                    try {
                        setLoading(true)
                        const body = {
                            ...(modifiedValues.name && { name: values.name }),
                            ...(modifiedValues.description && { description: values.description }),
                            ...(modifiedValues.img && { img: values.img }),
                            ...(modifiedValues.tags && { tags: values.tags }),
                        }
                        const response = await editForum(body, forumId, token)
                        if (response === 200) {
                            navigate(`/forum/${forumId}`)
                            setTimeout(
                                showExternalToast("Foro editado correctamente", "success"),
                                500,
                            )
                        } else {
                            showExternalToast(response.body, "error")
                        }
                    } finally {
                        setLoading(false)
                    }
                }}
            >
                {({ dirty, values, handleChange }) => (
                    <Form className="editForumContainer">
                        <h4 className="bold">Editar Foro</h4>
                        <CustomTextField
                            label="Nombre"
                            placeholder={mockData.name}
                            name="name"
                            value={values.name}
                            onChange={(e) => {
                                handleChange(e)
                                handleFieldChange("name", e.target.value)
                            }}
                        />
                        <CustomTextField
                            label="Link de la foto"
                            placeholder={mockData.image}
                            name="img"
                            value={values.img}
                            onChange={(e) => {
                                handleChange(e)
                                handleFieldChange("img", e.target.value)
                            }}
                        />
                        <CustomTextField
                            label="Descripción"
                            placeholder={mockData.description}
                            name="description"
                            value={values.description}
                            onChange={(e) => {
                                handleChange(e)
                                handleFieldChange("description", e.target.value)
                            }}
                        />
                        <Autocomplete
                            label="Etiquetas"
                            name="tags"
                            placeholder="Accion, Harry Potter, Romance..."
                            options={["Humor", "Rayo", "Mitología"]}
                            className="autocomplete"
                            multiple
                            value={values.tags}
                            onChange={(e) => {
                                handleChange(e)
                                handleFieldChange("tags", e.target.value)
                            }}
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

export default withToast(EditForum)
