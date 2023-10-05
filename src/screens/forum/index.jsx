import React, { useEffect, useState } from "react"
import HeaderForum from "../../components/HeaderForum"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { useNavigate, useParams } from "react-router-dom"
import withToast from "../../hoc/withToast"
import Loader from "../../components/Loader"
import AddPost from "../../components/AddPost"
import "./styles.css"
import { getForum, leaveForum } from "../../service/apis"
import LikeButton from "../../components/LikeButton"
import DislikeButton from "../../components/DislikeButton"
import Button from "../../components/Button"
import TextInputModal from "../../components/TextInputModal"

const Forum = ({ showToast }) => {
    const { forumId } = useParams()
    const { token, id } = useCurrentUser()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [forum, setForum] = useState({})
    const [showModal, setShowModal] = useState(false)
    const [updateValue, setUpdateValue] = useState("fabroo") //mock

    // const mockLikesAmount = 12
    // const mockDislikesAmount= 12
    //
    // const mockLikes = [1, 2, 3, 4, 10]
    // const mockDislikes = [5, 6, 7, 8]
    //
    // const userHasLiked = mockLikes.includes(parseInt(id))
    // const userHasDisliked = mockDislikes.includes(parseInt(id))

    useEffect(() => {
        setLoading(true)
        getForumData().then()
        setLoading(false)
    }, [forum.searcherIsMember])

    const getForumData = async () => {
        const response = await getForum(token, forumId)
        if (response.status === 200) {
            setForum(response.data)
        } else {
            showToast("Error al cargar el foro", "error")
            navigate("/home")
        }
    }
    const handleInputChange = (value) => {
        setUpdateValue(value)
    }

    return (
        <>
            <Loader open={loading} />
            <HeaderForum
                id={forumId}
                title={forum.title}
                description={forum.description}
                image={forum.img}
                owner={forum.ownerId == id}
                amtOfUsers={forum.members}
                tags={forum.tags}
                isMember={forum.searcherIsMember}
                setForumData={setForum}
            />
            <div className="addPostContainer">
                <AddPost
                    textFieldPlaceholder={"Comparte tus ideas"}
                    onClick={() => {}} //aca iria la funcion que añade el post
                    buttonText={"Crear publicacion"}
                />
            </div>

            {/*<br />*/}
            {/*<div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>*/}
            {/*    <LikeButton initialLiked={userHasLiked} likeAmount={mockLikesAmount} />*/}
            {/*</div>*/}
            {/*<br />*/}
            {/*<div style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>*/}
            {/*    <DislikeButton initialDisliked={userHasDisliked} dislikeAmount={mockDislikesAmount}/>*/}
            {/*</div>*/}
            <Button onClick={() => setShowModal(true)}>Editar</Button>
            {showModal && (
                <TextInputModal
                    title={"Actualizar Comentario."}
                    firstButton="Cancelar"
                    secondButton="Actualizar"
                    firstButtonAction={() => {
                        setShowModal(false)
                        setUpdateValue("") //mock deberia decir fabro pero al estar en mock no puedo tomar el valor anterior
                    }}
                    secondButtonAction={() => {
                        console.log(updateValue)
                        setShowModal(false)
                    }}
                    initialValue={updateValue}
                    handleInputChange={handleInputChange}
                ></TextInputModal>
            )}
        </>
    )
}

export default withToast(Forum)
