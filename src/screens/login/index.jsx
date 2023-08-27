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

const Login = () => {
    const navigate = useNavigate()
    //The disabled loading is from another ticket.
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
                        .email("El email no es valido"),
                    password: Yup.string().required("La contraseña es requerida"),
                })}
                onSubmit={async (values, { resetForm }) => {
                    const { email, password } = values
                    setLoading(true)

                    loginUser(email, password)
                        .then((response) => {
                            //This part can be better, it depends on the Response status
                            if (response) {
                                changeCurrentUser("token", 1)
                                navigate("/home")
                            } else resetForm()
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }}
            >
                <Form className="login-form-container">
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
                            <Button size="large" disabled={loading}>
                                Iniciar sesion
                            </Button>
                            <Button
                                size="large"
                                disabled={loading}
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
export default Login