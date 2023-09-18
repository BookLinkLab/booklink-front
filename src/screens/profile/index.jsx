import "./styles.css"
import CustomTextField from "../../components/TextField"
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
import Card from "../../components/Card"

const ProfileScreen = ({ showToast }) => {
    const { id, token, logOutCurrentUser } = useCurrentUser()
    const { id: profileId } = useParams()
    const [user, setUser] = useState({ username: "", email: "", id: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [forumsJoined, setForumsJoined] = useState([])
    const [myForums, setMyForums] = useState([])
    const [cardInfo, setCardInfo] = useState([1, 1])

    useEffect(() => {
        setLoading(true)
        getUser(id, token)
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data)
                    setForumsJoined(response.data.forumsJoined)
                    setMyForums(response.data.forumsCreated)
                } else {
                    showToast(response.data.message, "error")
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
                                <CustomTextField
                                    label={"Nombre de usuario"}
                                    name={"username"}
                                    disabled={profileId !== id}
                                />
                                <CustomTextField
                                    label={"Email"}
                                    name={"email"}
                                    disabled={profileId !== id}
                                />
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

                {forumsJoined.length !== 0 ? (
                    <div className="cardsGrid">
                        {forumsJoined.map((info) => (
                            <Card
                                key={info.id}
                                id={info.id}
                                text={info.name}
                                members={info.members.length}
                                chips={info.tags.map((tag) => tag.name)}
                                image={info.img}
                                joined={true}
                            />
                        ))}
                    </div>
                ) : (
                    <h6 className="aligned">
                        {profileId === id
                            ? "No perteneces a ninguna comunidad"
                            : "No pertenece a ninguna comunidad"}
                    </h6>
                )}

                {profileId === id ? (
                    <h5 className="bold">Mis foros</h5>
                ) : (
                    <h5 className="bold">Sus foros</h5>
                )}

                {myForums.length !== 0 ? (
                    <div className="cardsGrid">
                        {myForums.map((info) => (
                            <Card
                                key={info.id}
                                id={info.id}
                                text={info.name}
                                members={info.members.length}
                                chips={info.tags.map((tag) => tag.name)}
                                image={info.img}
                                joined={true}
                            />
                        ))}
                    </div>
                ) : (
                    <h6 className="aligned">
                        {profileId === id ? "No tienes foros creados" : "No tiene foros creados"}
                    </h6>
                )}
            </section>
        </div>
    )
}
export default withToast(ProfileScreen)
