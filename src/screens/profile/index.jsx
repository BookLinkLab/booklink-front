import "./styles.css"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { useEffect, useState } from "react"
import { getUser } from "../../service/apis"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import { useCurrentUser } from "../../hooks/useCurrentUser"

const ProfileScreen = ({ showToast }) => {
    const { id } = useCurrentUser()
    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        getUser(id)
            .then((response) => {
                if (response.ok) setUser(response)
                else if (response.status === 400) {
                    throw new Error("Tipo de dato incorrecto.")
                } else if (response.status === 404) {
                    throw new Error("Usuario no encontrado.")
                } else if (response.status === 500) {
                    throw new Error(`Ha ocurrido un error, ${response.message}`)
                }
            })
            .catch((error) => {
                showToast.error(error.message)
            })
            .finally(() => setLoading(false))
    }, [id, showToast])

    function isValid(values, errors) {
        return (
            (values.username === mockInitialValues.username &&
                values.email === mockInitialValues.email) ||
            errors.username ||
            errors.email
        )
    }
    async function handleUpdate(values) {}

    const mockInitialValues = { username: "IceWolf", email: "fabrizio.serial@hotmail.com" }

    return (
        <div className="items-aligned">
            <Loader open={loading} />
            <div className="container">
                <h4 className="bold">Perfil</h4>
                <Formik
                    initialValues={mockInitialValues}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required("Este campo es obligatorio"),
                        email: Yup.string()
                            .required("Este campo es obligatorio")
                            .email("Ingrese una dirección de correo válida."),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        if (
                            values.username === mockInitialValues.username &&
                            values.email === mockInitialValues.email
                        ) {
                            setSubmitting(false)
                            return
                        }
                        await handleUpdate(values)
                        resetForm()
                        setSubmitting(false)
                    }}
                >
                    {({ values, errors }) => (
                        <Form>
                            <div className="textfield-container">
                                <TextField label={"Nombre de usuario"} name={"username"} />
                                <TextField label={"Email"} name={"email"} />
                            </div>
                            <Button
                                disabled={isValid(values, errors)}
                                size="medium"
                                className="update-button-spacing"
                            >
                                Actualizar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <Button variant="outlined" className="log-out-button-margin">
                Cerrar sesión
            </Button>
        </div>
    )
}
export default withToast(ProfileScreen)
