import "./styles.css"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import { updateUser } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useEffect, useState } from "react"
import { getUser } from "../../service/apis"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import { useNavigate, useParams } from "react-router-dom"

const ProfileScreen = ({ showToast }) => {
    const { id, token, logOutCurrentUser } = useCurrentUser()
    const { id: profileId } = useParams()
    const [user, setUser] = useState({ username: "", email: "", id: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const cardInfo = [1, 1, 1]
    useEffect(() => {
        setLoading(true)
        console.log(id)
        getUser(profileId, token)
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data)
                } else if (response.status === 400) {
                    throw new Error("Tipo de dato incorrecto.")
                } else if (response.status === 404) {
                    throw new Error("Usuario no encontrado.")
                } else if (response.status === 500) {
                    throw new Error(`Ha ocurrido un error, ${response.data.message}`)
                }
            })
            .catch((error) => {
                showToast(error.message, "error")
            })
            .finally(() => setLoading(false))
    }, [id, showToast, token, profileId])

    function isValid(values, errors) {
        return (
            (values.username === user.username && values.email === user.email) ||
            errors.username ||
            errors.email
        )
    }
    async function handleUpdate(values) {
        setLoading(true)
        updateUser(id, token, values)
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data)
                    showToast("Perfil de usuario actualizado", "success")
                }
            })
            .catch(({ response }) => {
                if (response.status === 400) {
                    showToast("Tipo de dato incorrecto.", "error")
                } else if (response.status === 401) {
                    showToast("Credenciales inválidas.", "error")
                } else if (response.status === 404) {
                    showToast("Hubo un error al actualizar el usuario.", "error")
                } else if (response.status === 409) {
                    showToast("Usuario con credenciales ya existente.", "error")
                } else if (response.status === 500) {
                    showToast("Error del servidor", "error")
                }
            })
            .finally(() => setLoading(false))
    }

    function logOut() {
        logOutCurrentUser()
        navigate("/login")
    }

    return (
        <div className="items-aligned">
            <Loader open={loading} />
            <div className="container">
                <h4 className="bold">Perfil</h4>
                <Formik
                    enableReinitialize
                    initialValues={user}
                    validationSchema={Yup.object().shape({
                        username: Yup.string().required("Este campo es obligatorio"),
                        email: Yup.string()
                            .required("Este campo es obligatorio")
                            .email("Ingrese una dirección de correo válida."),
                    })}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        if (values.username === user.username && values.email === user.email) {
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
                            {profileId === id && (
                                <Button
                                    disabled={isValid(values, errors)}
                                    size="medium"
                                    className="update-button-spacing"
                                >
                                    Actualizar
                                </Button>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
            {profileId === id && (
                <Button variant="outlined" className="log-out-button-margin" onClick={logOut}>
                    Cerrar sesión
                </Button>
            )}
            <section>
                {profileId === id ? (
                    <h5 className="bold">Foros a los que pertenezco</h5>
                ) : (
                    <h5 className="bold">Foros a los que pertenece</h5>
                )}
                <div className="cardsGrid">
                    {cardInfo.map((info) => (
                        <div className="itemsInGrid">hola</div>
                    ))}
                </div>
                {profileId === id ? (
                    <h5 className="bold">Mis foros</h5>
                ) : (
                    <h5 className="bold">Sus foros</h5>
                )}
                <div className="cardsGrid">
                    {cardInfo.map((info) => (
                        <div className="itemsInGrid">hola</div>
                    ))}
                </div>
            </section>
        </div>
    )
}
export default withToast(ProfileScreen)
