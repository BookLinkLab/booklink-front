import "./styles.css"
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { Form, Formik } from "formik"
const Home = () => {
    const cardInfo = [1, 1, 1]

    return (
        <div>
            <div className="homeStyle">
                <h5 className={"bold"}>Buscar comunidad</h5>
                <Formik
                    initialValues={{ text: "" }}
                    onSubmit={() => console.log("hi fabro") /*getComunities('')*/}
                >
                    <Form>
                        <div className="aligned">
                            <TextField
                                name={"text"}
                                placeholder={"Busca por nombre, etiquetas o descripción..."}
                            />
                            <Button>Buscar</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
            {cardInfo.length !== 0 ? (
                <div className="cardsGrid">
                    {cardInfo.map((info) => (
                        <div className="itemsInGrid">hola</div>
                    ))}
                </div>
            ) : (
                <h6 className="bold notFound">No se encontró ningún resultado</h6>
            )}
        </div>
    )
}
export default Home
