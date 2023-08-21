import "./styles.css"
import TextField from "../../components/TextField"
import Button from "../../components/Button"
import { Form, Formik } from "formik"
import * as Yup from "yup"

const ProfileScreen = () => {
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
        <>
            <div className="container">
                <h4 className="bold gaps">Perfil</h4>
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
                            <TextField label={"Nombre de usuario"} name={"username"} />
                            <TextField className="gaps2" label={"Email"} name={"email"} />
                            <Button disabled={isValid(values, errors)} size="medium">
                                Actualizar
                            </Button>
                        </Form>
                    )}
                </Formik>
            </div>
            <Button variant="outlined" className="gaps3">
                Cerrar sesión
            </Button>
        </>
    )
}
export default ProfileScreen
