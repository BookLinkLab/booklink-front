import axios from "axios"

const bookLinkAxios = axios.create({
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
