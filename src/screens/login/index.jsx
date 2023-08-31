import "./styles.css"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { loginUser } from "../../service/apis"
import { useNavigate } from "react-router-dom"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
import Logo from "../../components/Logo"
import { useState } from "react"
import SplitScreen from "../../components/SplitScreen"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"

const Login = ({ showToast }) => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const { changeCurrentUser } = useCurrentUser()

    return (
        <SplitScreen>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                validationSchema={Yup.object({
                    email: Yup.string()
                        .required("El email es requerido")
                        .email("El email no es válido"),
                    password: Yup.string().required("La contraseña es requerida"),
                })}
                onSubmit={async (values) => {
                    const { email, password } = values
                    setLoading(true)
                    loginUser(email, password)
                        .then((response) => {
                            if (response.status) {
                                changeCurrentUser(response.token, response.id)
                                navigate("/home")
                            } else {
                                showToast("Credenciales incorrectas", "error")
                            }
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }}
            >
                <Form className="login-form-container">
                    <Loader open={loading} />
                    <Logo size="large" />
                    <div className="login-div-2">
                        <div className="inputs-login-div">
                            <TextField
                                label="Email"
                                name="email"
                                placeholder="janedoe@gmail.com"
                                variant="placeholder"
                                helpText=""
                            />
                            <TextField
                                label="Contraseña"
                                name="password"
                                type="Password"
                                placeholder="Password123"
                                helpText=""
                            />
                        </div>
                        <div className="buttons-login-div">
                            <Button size="large">Iniciar sesión</Button>
                            <Button
                                size="large"
                                variant="ghost"
                                onClick={() => navigate("/register")}
                            >
                                Registrarse
                            </Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </SplitScreen>
    )
}
export default withToast(Login)
