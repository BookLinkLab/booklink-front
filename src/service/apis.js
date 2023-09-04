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
    const user = {
        username: username,
        email: email,
        password: password,
    }
    try {
        const resp = await bookLinkAxios.post("/user", user)
        return resp.data
    } catch (error) {
        return error.response
    }
}
export const getUser = async (id, token) => {
    return await bookLinkAuthenticatedAxios(token).get(`/user/${id}`)
}
export const updateUser = async (id, token, updatedUserInfo) => {
    return await bookLinkAuthenticatedAxios(token).patch(`/user/${id}`, updatedUserInfo)
}

export const createForum = async (name, description, img) => {
    const forum = {
        name: name,
        description: description,
        img: img,
    }
    return await bookLinkAxios.post("/forum", forum)
}
