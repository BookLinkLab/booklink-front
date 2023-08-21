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

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    return (
        <SplitScreen>
            <Formik
                initialValues={{
                    Email: "",
                    Password: "",
                }}
                validationSchema={Yup.object({
                    Email: Yup.string().required("El email es requerido"),
                    Password: Yup.string().required("La contraseña es requerida"),
                })}
                onSubmit={async (values, { resetForm }) => {
                    const { Email, Password } = values
                    setLoading(true)

                    loginUser(Email, Password)
                        .then((response) => {
                            //This part can be better, it depends on the Response status
                            !!response && response ? navigate("/home") : resetForm()
                        })
                        .finally(() => {
                            setLoading(false)
                        })
                }}
            >
                <Form>
                    <div className="login-div-1">
                        <div className="login-logo-div">
                            <Logo size="large" />
                        </div>
                        <div className="login-div-2">
                            <div className="inputs-login-div">
                                <TextField
                                    label="Email"
                                    name="Email"
                                    placeholder="janedoe@gmail.com"
                                    variant="placeholder"
                                    helpText=""
                                />
                                <TextField
                                    label="Contraseña"
                                    name="Password"
                                    type="Password"
                                    placeholder="Password123"
                                    helpText=""
                                />
                            </div>
                            <div className="buttons-login-div">
                                <Button size="large" disabled={loading}>
                                    Iniciar sesion
                                </Button>
                                <Button size="large" disabled={loading} variant="ghost">
                                    Registrarse
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </SplitScreen>
    )
}
export default Login
