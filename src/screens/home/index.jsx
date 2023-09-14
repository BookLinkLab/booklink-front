import "./styles.css"
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { Form, Formik } from "formik"
import Card from "../../components/Card"
import Loader from "../../components/Loader"
import { useEffect, useState } from "react"
import { searchForums } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import withToast from "../../hoc/withToast"
import { useNavigate } from "react-router-dom"
import AutocompleteMUI from "../../components/Autocomplete"
const Home = ({ showToast }) => {
    const [cardsInfo, setCardsInfo] = useState([])
    const { token, logOutCurrentUser } = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const mockTags = [
        { id: 1, value: "Accion" },
        { id: 2, value: "Aventura" },
        { id: 3, value: "Comedia" },
        { id: 4, value: "Drama" },
        { id: 5, value: "Terror" },
        { id: 6, value: "Suspenso" },
    ]
    useEffect(() => {
        handleSearch("").then()
    }, [])

    const handleSearch = async (forumName) => {
        try {
            setLoading(true)
            const cardsArray = await searchForums(forumName, token)
            setCardsInfo(cardsArray)
        } catch (error) {
            if (error.response) {
                //weird ask
                if (error.response.status === 401 || error.response.status === 403) {
                    logOutCurrentUser()
                    navigate("/login")
                }
            }
            showToast("Ocurrió un error", "error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <Loader open={loading} />
            <div className="homeStyle">
                <h5 className={"bold"}>Buscar comunidad</h5>
                <Formik
                    initialValues={{ forumName: "" }}
                    onSubmit={async (values, { setSubmitting, resetForm }) => {
                        await handleSearch(values.forumName)
                        setSubmitting(false)
                    }}
                >
                    <Form>
                        <div className="aligned">
                            <TextField
                                name={"forumName"}
                                placeholder={"Busca por nombre, etiquetas o descripción..."}
                            />
                            <Button>Buscar</Button>
                        </div>
                        <div>
                            <h6 className="h6-style-home">Filtrar por etiqueta</h6>
                            <AutocompleteMUI
                                name={"name"}
                                placeholder={"Fantasia, Terror, Humor ..."}
                                options={mockTags.map((value) => value.value)}
                            ></AutocompleteMUI>
                        </div>
                    </Form>
                </Formik>
            </div>
            {cardsInfo.length !== 0 ? (
                <div className="cardsGrid">
                    {cardsInfo.map((info) => (
                        <Card
                            key={info.id}
                            id={info.id}
                            text={info.name}
                            joined={true}
                            members={info.members}
                            chips={info.tags}
                            image={info.img}
                        />
                    ))}
                </div>
            ) : (
                <h6 className="bold notFound">No se encontró ningún resultado</h6>
            )}
        </div>
    )
}
export default withToast(Home)
