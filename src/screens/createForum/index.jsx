import "./styles.css"
import CustomTextField from "../../components/TextField"
import { Form, Formik } from "formik"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import * as Yup from "yup"
import { createForum, getTags } from "../../service/apis"
import { useNavigate } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Button from "../../components/Button"
import Autocomplete from "../../components/Autocomplete"
import { useCurrentUser } from "../../hooks/useCurrentUser"

const CreateForum = ({ showToast }) => {
    const { token } = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [tagOptions, setTagOptions] = useState([])

    const [chipSet, setChipSet] = useState([
        { name: "Horror" },
        { name: "Drama" },
    ]) /* TODO getTags(token) */

    const validateSchema = Yup.object().shape({
        name: Yup.string().required("Este campo es requerido"),
        img: Yup.string().url().required("Este campo es requerido"),
        description: Yup.string().required("Este campo es requerido"),
        tags: Yup.array(),
    })

    const onTagsChange = (event, values) => {
        setChipSet(values.tags)
    }

    useEffect(() => {
        setLoading(true)
        getTags(token)
            .then((tags) => {
                const tagNames = tags.map((tag) => tag.name)
                setTagOptions(tagNames)
            })
            .catch((error) => {
                showToast(error.data, "error")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [token])

    return (
        <>
            <Loader open={loading} />
            <Formik
                initialValues={{
                    name: "",
                    img: "",
                    description: "",
                    tags: [],
                }}
                validationSchema={validateSchema}
                onSubmit={async ({ name, description, img, tags }) => {
                    try {
                        setLoading(true)
                        const response = await createForum(token, name, description, img, tags)
                        if (response.status === 201) {
                            showToast(response.data, "success")
                            navigate(`/forum/${response.data.id}`)
                        } else {
                            showToast(response.data, "error")
                        }
                    } finally {
                        setLoading(false)
                    }
                }}
            >
                <Form className="create-forum-container">
                    <h3 className="bold">Crear Foro</h3>
                    <CustomTextField
                        label="Nombre"
                        placeholder="Nombre de la comunidad"
                        name="name"
                    />
                    <CustomTextField
                        label="Link de la foto"
                        placeholder="https://www.bookpedia.com/coomunity"
                        name="img"
                    />
                    <CustomTextField
                        label="Descripción"
                        placeholder="Lorem ipsum dolor sit amet consectetur..."
                        name="description"
                    />
                    <Autocomplete
                        label="Etiquetas"
                        name="tags"
                        placeholder="Accion, Harry Potter, Romance..."
                        options={tagOptions}
                        handleChange={onTagsChange}
                        freeSolo={true}
                    />
                    <Button className="create-button" type="submit" size="medium">
                        Crear
                    </Button>
                </Form>
            </Formik>
        </>
    )
}

export default withToast(CreateForum)
