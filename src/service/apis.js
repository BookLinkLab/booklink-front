import axios from "axios"

const bookLinkAxios = axios.create({
    headers: { "Access-Control-Allow-Origin": "*" },
    baseURL: "http://localhost:8080",
})

export const loginUser = async (email, password) => {
    // try {
    //     const response = await bookLinkAxios.post("/api/login", { email: email, password: password })
    //     return response.data.token
    // } catch (error) {
    //     return null
    // }
    //This is an example of what the api call would be.
    return null
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
