import "./styles.css"
import Button from "../../components/Button"
import TextField from "../../components/TextField"
import { Form, Formik } from "formik"
import Card from "../../components/Card"
import Loader from "../../components/Loader"
import { useEffect, useState } from "react"
import { getForum, getTags, searchForums } from "../../service/apis"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import withToast from "../../hoc/withToast"
import { useNavigate } from "react-router-dom"
import AutocompleteMUI from "../../components/Autocomplete"
import { joinForum } from "../../service/apis"

const Home = ({ showToast }) => {
    const [cardsInfo, setCardsInfo] = useState([])
    const { token, logOutCurrentUser } = useCurrentUser()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [tagOptions, setTagOptions] = useState([])

    useEffect(() => {
        getTags(token).then((data) => {
            setTags(data)
        })
        handleSearch("").then()
    }, [token])

    const handleSearch = async (forumName) => {
        try {
            setLoading(true)
            const cardsArray = await searchForums(forumName, token, selectedTags)
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

    const handleTagChange = (values) => {
        const updatedTags = values.map((tagName) => {
            const tag = tags.find((t) => t.name === tagName)
            return tag ? tag.id : null
        })

        setSelectedTags(updatedTags)
    }

    useEffect(() => {
        setLoading(true)
        getTags(token)
            .then((tags) => {
                const tagNames = tags.map((tag) => tag.name)
                setTagOptions(tagNames)
            })
            .catch((error) => {
                showToast(error.data, "error")
            })
            .finally(() => setLoading(false))
    }, [token])

    return (
        <div>
            <Loader open={loading} />
            <div className="homeStyle">
                <h5 className={"bold"}>Buscar comunidad</h5>
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
                                placeholder={"Busca por nombre o descripción..."}
                            />
                            <Button>Buscar</Button>
                        </div>
                        <div>
                            <h6 className="h6-style-home">Filtrar por etiqueta</h6>
                            <AutocompleteMUI
                                name={"tags"}
                                placeholder={"Fantasia, Terror, Humor ..."}
                                options={tagOptions}
                                onTagChange={handleTagChange}
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
