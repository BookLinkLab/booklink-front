import axios from "axios"

const error_status = { 400: "Ha ocurrido un error, ", 500: "Error del servidor, " }

const bookLinkAxios = axios.create({
    baseURL: "http://localhost:8080",
})

const bookLinkAuthenticatedAxios = (token) =>
    axios.create({
        baseURL: "http://localhost:8080",
        headers: { Authorization: "Bearer " + token },
    })

export const loginUser = async (email, password) => {
    try {
        const response = await bookLinkAxios.post("/auth", { email: email, password: password })
        return { status: response.status, token: response.data.token, id: response.data.user.id }
    } catch (error) {
        return {
            data: error_status[error.response.status]
                ? error_status[error.response.status]
                : "" + error.response.data,
        }
    }
}

export const registerUser = async (username, email, password) => {
    // try {
    //     const resp = await bookLinkAxios.post("api/register", {username, email, password})
    //     return response.data.token
    // } catch (error) {
    //     return null
    // }
    return null
}
export const getUser = async (id, token) => {
    return await bookLinkAuthenticatedAxios(token).get(`/user/${id}`)
}
