import "./styles.css"
import TextField from "../../components/TextField"
import { Form, Formik } from "formik"
import { useState } from "react"
import Loader from "../../components/Loader"
import * as Yup from "yup"
import { createForum } from "../../service/apis"
import { useNavigate } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Button from "../../components/Button"
import Autocomplete from "@mui/material/Autocomplete"

/* TODO
        fontSize h3 not working in div CREATE-FORUM
        perfeccionar button
 */

const CreateForum = ({ showToast }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    // const [input, setInput] = useState([])
    const chipSet = [{ name: "Comedia" }, { name: "Horror" }, { name: "Terror" }, { name: "Drama" }]

    const validateSchema = Yup.object().shape({
        name: Yup.string().required("Este campo es requerido"),
        img: Yup.string().url("Este campo es requerido"),
        description: Yup.string().required("Este campo es requerido"),
        tags: Yup.string().required("Este campo es requerido"),
    })

    // const onTagsChange = (values) => {
    //     debugger;
    //     setInput(values)
    // }

    return (
        <>
            <Loader open={loading} />
            <Formik
                initialValues={{
                    name: "",
                    img: "",
                    description: "",
                    tags: "",
                }}
                validationSchema={validateSchema}
                onSubmit={async ({ name, description, img }, { resetForm }) => {
                    try {
                        setLoading(true)
                        const resp = await createForum(name, description, img)
                        if (resp.status === 200) {
                            navigate(`/forum/:${resp.data.id}`)
                        } else {
                            console.log(resp.data)
                            showToast(resp.error, "error")
                            resetForm()
                        }
                    } finally {
                        setLoading(false)
                    }
                }}
            >
                {({ handleChange }) => (
                    <Form className="form-container">
                        <p className="bold" style={{ fontSize: 32, marginBottom: 60 }}>
                            Crear Foro
                        </p>
                        <TextField
                            label="Nombre"
                            placeholder="Nombre de la comunidad"
                            name="name"
                        />
                        <TextField
                            label="Link de la foto"
                            placeholder="https://www.bookpedia.com/coomunity"
                            name="img"
                        />
                        <TextField
                            label="Descripción"
                            placeholder="Lorem ipsum dolor sit amet consectetur..."
                            name="description"
                        />
                        <Autocomplete
                            multiple
                            freeSolo
                            name="tags"
                            options={chipSet.map((option) => option.name)}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 507 }}
                            onChange={handleChange}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Etiquetas"
                                    placeholder="Comedia, Romántica"
                                    name="tags"
                                    ref={params.InputProps.ref}
                                />
                            )}
                        />
                        <Button type="submit" size="medium" style={{ marginTop: 32 }}>
                            Crear
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default withToast(CreateForum)
