import React from "react"
import SplitScreen from "../../components/SplitScreen"
import "./styles.css"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Form, Formik } from "formik"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
import Logo from "../../components/Logo"
import { registerUser } from "../../service/apis"

const RegisterScreen = () => {
    const navigate = useNavigate()

    const validateSchema = Yup.object().shape({
        username: Yup.string().required("Este campo es requerido"),
        email: Yup.string().email("Ingrese un email válido").required("Este campo es requerido"),
        password: Yup.string()
            .required("Este campo es requerido")
            .min(8, "Mínimo 8 caracteres")
            .matches(
                /(?=.*[a-z])(?=.*[A-Z])\w+/,
                "La contraseña debe contener al menos una mayúscula y una minúscula",
            )
            .matches(/\d/, "La contraseña debe tener al menos 1 número"),
        confirmPassword: Yup.string().when("password", (password, field) => {
            if (password) {
                return field
                    .required("Las contraseñas no coinciden")
                    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
            }
        }),
    })

    return (
        <SplitScreen>
            <Formik
                initialValues={{
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                validationSchema={validateSchema}
                onSubmit={async (values, { resetForm }) => {
                    registerUser(values).then((response) => {
                        !!response && response ? navigate("/login") : resetForm()
                    })
                }}
            >
                <Form className="form-container">
                    <div className="logo-container">
                        <Logo size="large"></Logo>
                    </div>
                    <div className="title">Registro</div>
                    <div className="input-container">
                        <TextField
                            label="Nombre de Usuario"
                            placeholder="IceWolf"
                            name="username"
                            variant="placeholder"
                            helpText=""
                        />
                        <TextField
                            label="Email"
                            placeholder="fabrizio.serial@hotmail.com"
                            name="email"
                        />
                        <TextField
                            label="Contraseña"
                            placeholder="Password123"
                            name="password"
                            type="password"
                        />
                        <TextField
                            label="Repetir Contraseña"
                            placeholder="Password123"
                            name="confirmPassword"
                            type="password"
                        />
                    </div>
                    <div className="button-container">
                        <Button size="large" type={"submit"}>
                            Registrar
                        </Button>
                        <Button variant={"ghost"} onClick={() => navigate("/login")}>
                            Tengo una cuenta
                        </Button>
                    </div>
                </Form>
            </Formik>
        </SplitScreen>
    )
}
export default RegisterScreen
