import "./styles.css"
import CustomTextField from "../../components/TextField"
import { Form, Formik } from "formik"
import { useState } from "react"
import Loader from "../../components/Loader"
import * as Yup from "yup"
import { createForum, getTags } from "../../service/apis"
import { useNavigate } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Button from "../../components/Button"
import Autocomplete from "../../components/Autocomplete"
import { useCurrentUser } from "../../hooks/useCurrentUser"

const CreateForum = ({ showToast }) => {
    const token = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const [chipSet, setChipSet] = useState(getTags(token))

    const validateSchema = Yup.object().shape({
        name: Yup.string().required("Este campo es requerido"),
        img: Yup.string().url().required("Este campo es requerido"),
        description: Yup.string().required("Este campo es requerido"),
        tags: Yup.array()
            .required("Este campo es requerido")
            .min(1, "Selecciona al menos una etiqueta"),
    })

    const onTagsChange = (event, values) => {
        setChipSet(values.tags)
    }

    return (
        <>
            <Loader open={loading} />
            <Formik
                initialValues={{
                    name: "",
                    img: "",
                    description: "",
                    tags: "", // [] next week
                }}
                validationSchema={validateSchema}
                onSubmit={async ({ name, description, img, tags }) => {
                    try {
                        setLoading(true)
                        const response = await createForum(token, name, description, img, tags)
                        if (response.status === 200) {
                            navigate(`/forum/:${response.data.id}`)
                        } else {
                            showToast(response.body, "error")
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
                        options={chipSet}
                        handleChange={onTagsChange}
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
