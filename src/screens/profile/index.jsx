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
import Notification from "../../components/Notification"

const ProfileScreen = ({ showToast }) => {
    const { id, token, logOutCurrentUser } = useCurrentUser()
    const { id: profileId } = useParams()
    const [user, setUser] = useState({ username: "", email: "", id: "" })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [forumsJoined, setForumsJoined] = useState([])
    const [myForums, setMyForums] = useState([])
    const [latestPost, setLatestPosts] = useState([])

    useEffect(() => {
        setLoading(true)
        getUser(profileId, token)
            .then((response) => {
                if (response.status === 200) {
                    setUser(response.data)
                    setForumsJoined(response.data.forumsJoined)
                    setMyForums(response.data.forumsCreated)
                    setLatestPosts(response.data.latestPosts)
                } else if (response.status === 400 || response.status === 404) navigate("/")
                else showToast(response.data.message, "error")
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
        const { email, username } = values

        updateUser(id, token, { email, username })
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
                    onSubmit={async (values, { setSubmitting }) => {
                        if (values.username === user.username && values.email === user.email) {
                            setSubmitting(false)
                            return
                        }
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
                                    onClick={() => handleUpdate(values)}
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
                <div className="forums-div">
                    <h4 className="bold" style={{ marginTop: "32px" }}>
                        {profileId === id
                            ? "Foros a los que pertenezco"
                            : "Foros a los que pertenece"}
                    </h4>
                    {forumsJoined.length !== 0 ? (
                        <div className="cardsGrid">
                            {forumsJoined.map((info) => (
                                <Card
                                    key={info.id}
                                    id={info.id}
                                    text={info.name}
                                    members={info.membersCount}
                                    chips={info.tags}
                                    image={info.img}
                                    joined={info.searcherIsMember}
                                />
                            ))}
                        </div>
                    ) : (
                        <h6 className="no-forums-message joined-cards-message">
                            {profileId === id
                                ? "No perteneces a ninguna comunidad"
                                : "No pertenece a ninguna comunidad"}
                        </h6>
                    )}
                </div>
                <div className="forums-div mb-48">
                    <h4 className="bold m-85">{profileId === id ? "Mis foros" : "Sus foros"}</h4>
                    {myForums.length !== 0 ? (
                        <div className="cardsGrid">
                            {myForums.map((info) => (
                                <Card
                                    key={info.id}
                                    id={info.id}
                                    text={info.name}
                                    members={info.membersCount}
                                    chips={info.tags}
                                    image={info.img}
                                    joined={info.searcherIsMember}
                                />
                            ))}
                        </div>
                    ) : (
                        <h6 className="no-forums-message own-cards-message">
                            {profileId === id
                                ? "No tienes foros creados"
                                : "No tiene foros creados"}
                        </h6>
                    )}
                </div>
            </section>
            <div className="latestActivity">
                <h4 className="latestActivityHeader bold">Ultima actividad</h4>
                {latestPost.map((post, index) => (
                    <Notification
                        key={index}
                        isProfile={true}
                        isSeen={false}
                        authorName={user.username}
                        forumName={post.forumName}
                        forumImg={post.img}
                        content={post.content}
                        onClick={() => navigate(`/forum/${post.forumId}/post/${post.id}`)}
                    />
                ))}
            </div>
        </div>
    )
}
export default withToast(ProfileScreen)
