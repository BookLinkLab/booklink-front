import axios from "axios"

const bookLinkAxios = axios.create({
    headers: { "Access-Control-Allow-Origin": "*" },
    baseURL: "http://localhost:8080",
})

const bookLinkAuthenticatedAxios = (token) =>
    axios.create({
        baseURL: "http://localhost:8080",
        headers: { Authorization: +token },
    })

export const loginUser = async (email, password) => {
    const error_status = { 400: "Ha ocurrido un error, ", 500: "Error del servidor, " }
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
    try {
        const resp = await bookLinkAxios.post("/user", {
            username: username,
            email: email,
            password: password,
        })
        return resp.data.token
    } catch (error) {
        return error.status
    }
}
