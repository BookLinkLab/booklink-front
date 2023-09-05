import "./styles.css"
import CustomTextField from "../../components/TextField"
import { Form, Formik } from "formik"
import { useState } from "react"
import Loader from "../../components/Loader"
import * as Yup from "yup"
import { createForum } from "../../service/apis"
import { useNavigate } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Button from "../../components/Button"
import { TextField, Autocomplete } from "@mui/material"

const CreateForum = ({ showToast }) => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const chipSet = [{ name: "Comedia" }, { name: "Horror" }, { name: "Terror" }, { name: "Drama" }]

    const validateSchema = Yup.object().shape({
        name: Yup.string().required("Este campo es requerido"),
        img: Yup.string().url("Este campo es requerido"),
        description: Yup.string().required("Este campo es requerido"),
        tags: Yup.string().required("Este campo es requerido"),
    })

    const onTagsChange = (values) => {
        // console.log(values)
    }

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
                onSubmit={async ({ name, description, img }) => {
                    try {
                        console.log("holaaaaaa")
                        setLoading(true)
                        const resp = await createForum(name, description, img)
                        console.log(resp)
                        if (resp.status === 200) {
                            navigate(`/forum/:${resp.data.id}`)
                        } else {
                            showToast(resp, "error")
                        }
                    } finally {
                        setLoading(false)
                    }
                }}
            >
                {({ values }) => (
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
                            style={{ width: 507 }}
                            multiple
                            id="tags-filled"
                            freeSolo
                            options={chipSet}
                            onChange={(event, newValue) => onTagsChange(newValue)}
                            getOptionLabel={(option) => option.name || option}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Etiquetas"
                                    placeholder="Comedia, Romántica"
                                    name="tags"
                                    InputProps={{
                                        style: {
                                            borderRadius: "8px",
                                            padding: "0",
                                            fontSize: "16px",
                                            border: "1px solid var(--grey-300)",
                                            marginBottom: "4px",
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            textAlign: "center",
                                            height: "87px",
                                            display: "flex",
                                            flexDirection: "column",
                                        },
                                    }}
                                />
                            )}
                        />
                        <Button className="create-button" type="submit" size="medium">
                            Crear
                        </Button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default withToast(CreateForum)
