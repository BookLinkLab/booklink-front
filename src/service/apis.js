import axios from "axios"

const error_status = { 400: "Ha ocurrido un error, ", 500: "Error del servidor, " }

const config = (token) => ({
    headers: {
        Authorization: "Bearer " + token,
    },
})

const bookLinkAxios = axios.create({
    baseURL: "http://localhost:8080",
})

bookLinkAxios.interceptors.response.use(
    function (response) {
        return response
    },
    function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            localStorage.clear()
            window.location.href = "/login"
        }
        return Promise.reject(error)
    },
)

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
    try {
        const response = await bookLinkAxios.get(`/user/${id}`, config(token))
        return response.data
    } catch (error) {
        return error.response
    }
}
export const updateUser = async (id, token, updatedUserInfo) => {
    return await bookLinkAxios.patch(`/user/${id}`, updatedUserInfo, config(token))
}

export const getForum = async (id, token) => {
    return await bookLinkAxios.get(`/forum/${id}`, config(token))
}

export const createForum = async (token, name, description, img) => {
    const forum = {
        name: name,
        description: description,
        img: img,
    }
    try {
        const response = await bookLinkAxios.post("/forum", forum, config(token))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const leaveForum = async (token, forumId) => {
    try {
        const response = await bookLinkAxios.delete(`/forum/${forumId}/leave`, config(token))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getTags = async (token) => {
    const response = await bookLinkAxios.get("/forum/tags", config(token))
    return response.data
}

export const searchForums = async (forumName, token) => {
    try {
        const response = await bookLinkAxios.get(
            `/forum/search?forumName=${forumName}`,
            config(token),
        )
        return response.data
    } catch (error) {
        throw error
    }
}
export const editForum = async (token, body, forumId) => {
    try {
        const response = await bookLinkAxios.patch(`/forum/${forumId}`, body, config(token))
        return response.data
    } catch (error) {
        return error.response
    }
}
