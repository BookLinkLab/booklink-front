import axios from "axios"

const bookLinkAxios = axios.create({
    baseURL: "http://localhost:8080",
})

const bookLinkAuthenticatedAxios = (token) =>
    axios.create({
        baseURL: "http://localhost:8080",
        headers: { Authorization: +token },
    })

export const loginUser = async (email, password) => {
    // try {
    //     const response = await bookLinkAxios.post("/auth", { email: email, password: password })
    //     return response.data
    //
    // } catch (error) {
    //     return null
    // }
    //
    // return null
    return "18"
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
