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
import { joinForum } from "../../service/apis"

const Home = ({ showToast }) => {
    const [cardsInfo, setCardsInfo] = useState([])
    const { token, logOutCurrentUser } = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        handleSearch("").then()
    }, [token])

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
                <h5 className={"bold"} style={{ marginTop: 100, marginBottom: 42 }}>
                    Buscar comunidad
                </h5>
                <Formik
                    initialValues={{ forumName: "" }}
                    onSubmit={async (values, { setSubmitting }) => {
                        await handleSearch(values.forumName)
                        setSubmitting(false)
                    }}
                >
                    <Form>
                        <div className="aligned">
                            <TextField
                                name={"forumName"}
                                placeholder={"Busca por nombre o etiqueta..."}
                                maxLength={64}
                            />
                            <Button>Buscar</Button>
                        </div>
                    </Form>
                </Formik>
            </div>
            {cardsInfo.length !== 0 ? (
                <div className="cardsGrid home-cards">
                    {cardsInfo.map((info) => (
                        <Card
                            key={info.id}
                            id={info.id}
                            text={info.name}
                            joined={info.searcherIsMember}
                            members={info.members}
                            chips={info.tags}
                            image={info.img}
                            buttonAction={() => {
                                setLoading(true)
                                joinForum(token, info.id)
                                    .then((response) => {
                                        if (response.status === 200) {
                                            navigate(`/forum/${info.id}`)
                                        } else {
                                            showToast(response.body, "error")
                                        }
                                    })
                                    .finally(() => setLoading(false))
                            }}
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
