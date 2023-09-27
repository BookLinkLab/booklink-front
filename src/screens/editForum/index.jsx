import React, { useEffect, useState } from "react"
import "./styles.css"
import CustomTextField from "../../components/TextField"
import { editForum, getForum, getTags } from "../../service/apis"
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
    const [forumData, setForumData] = useState({})
    const [tagOptions, setTagOptions] = useState([])
    const [modifiedValues, setModifiedValues] = useState({})

    const handleFieldChange = (fieldName, fieldValue) => {
        setModifiedValues({
            ...modifiedValues,
            [fieldName]: fieldName === "tags" ? fieldValue.split(",") : fieldValue,
        })
    }

    const getForumDataById = async (forumId) => {
        setLoading(true)
        const response = await getForum(token, forumId)
        if (response.status === 200) {
            setForumData(response.data)
        } else {
            showExternalToast(response.body, "error")
        }
        setLoading(false)
    }

    useEffect(() => {
        getForumDataById(forumId)
    }, [forumId])

    const validateSchema = Yup.object().shape({
        name: Yup.string().required("Este campo es requerido"),
        img: Yup.string().url().required("Este campo es requerido"),
        description: Yup.string().required("Este campo es requerido"),
        tags: Yup.array().max(4, "No puedes agregar más de 5 etiquetas"),
    })

    const mockData = {
        name: "Los Tomadores del Olimpo",
        description: "Foro para los tomadores del olimpo",
        img: "https://www.bookpedia.com/coomunity",
        tags: [{ name: "Humor" }, { name: "Rayo" }, { name: "Mitología" }],
    }

    useEffect(() => {
        getTags(token)
            .then((tags) => {
                const tagNames = tags.map((tag) => tag.name)
                setTagOptions(tagNames)
            })
            .catch((error) => {
                showExternalToast(error.data, "error")
            })
    }, [token])

    return (
        <div className={"container-edit"}>
            <Formik
                enableReinitialize
                initialValues={{
                    name: forumData.title,
                    img: forumData.img,
                    description: forumData.description,
                    tags: forumData.tags,
                }}
                validationSchema={validateSchema}
                onSubmit={async (values) => {
                    try {
                        setLoading(true)
                        const response = await editForum(token, values, forumId)
                        if (response.status === 200) {
                            navigate(`/forum/${forumId}`)
                            showExternalToast("Foro editado correctamente", "success")
                        } else {
                            showExternalToast(response.data, "error")
                        }
                    } finally {
                        setLoading(false)
                    }
                }}
            >
                {({ dirty, values, handleChange }) => (
                    <Form className="editForumContainer">
                        <h3 className="bold" style={{ marginBottom: 28 }}>
                            Editar Foro
                        </h3>
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
                            options={tagOptions}
                            freeSolo={true}
                            className="autocomplete"
                            multiple
                            value={values.tags}
                            onChange={(e, selectedOptions) => {
                                const selectedTags = selectedOptions.map((option) => option.name)
                                handleChange(e)
                                handleFieldChange("tags", selectedTags.join(","))
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
        </div>
    )
}

export default withToast(EditForum)
