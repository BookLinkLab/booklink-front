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
        return await bookLinkAxios.get(`/user/${id}`, config(token))
    } catch (error) {
        return error.response
    }
}
export const updateUser = async (id, token, updatedUserInfo) => {
    return await bookLinkAxios.patch(`/user/${id}`, updatedUserInfo, config(token))
}

export const getForum = async (token, forumId) => {
    try {
        return await bookLinkAxios.get(`/forum/${forumId}`, config(token))
    } catch (error) {
        return error.response
    }
}

export const createForum = async (token, name, description, img, tags) => {
    const forum = {
        name: name,
        description: description,
        img: img,
        tags: tags ? tags : [],
    }
    try {
        return await bookLinkAxios.post("/forum", forum, config(token))
    } catch (error) {
        return error.response
    }
}

export const leaveForum = async (token, forumId) => {
    try {
        return await bookLinkAxios.delete(`/forum/${forumId}/leave`, config(token))
    } catch (error) {
        return error.response
    }
}
export const getTags = async (token) => {
    try {
        const response = await bookLinkAxios.get("/tag", config(token))
        return response.data
    } catch (error) {
        return error.response
    }
}
export const searchForums = async (forumName, token, tags) => {
    try {
        const params = new URLSearchParams()

        if (forumName) {
            params.append("searchTerm", forumName)
        }

        if (tags && tags.length > 0) {
            params.append("tagIds", tags.join(","))
        }

        const response = await bookLinkAxios.get(
            `/forum/search?${params.toString()}`,
            config(token),
        )

        return response.data
    } catch (error) {
        throw error
    }
}

export const editForum = async (token, body, forumId) => {
    try {
        return await bookLinkAxios.patch(`/forum/${forumId}`, body, config(token))
    } catch (error) {
        return error.response
    }
}

export const joinForum = async (token, id) => {
    try {
        return await bookLinkAxios.post(`/forum/${id}/join`, null, config(token))
    } catch (error) {
        return error.response
    }
}

export const deleteForum = async (token, id) => {
    return await bookLinkAxios.delete(`/forum/${id}`, config(token))
}

export const addPostToForum = async (token, forumId, content) => {
    try {
        return await bookLinkAxios.post(`/post`, { forumId, content }, config(token))
    } catch (error) {
        return error.response
    }
}

export const updatePost = async (token, id, content) => {
    try {
        return await bookLinkAxios.patch(`/post/${id}`, { content }, config(token))
    } catch (error) {
        return error.response
    }
}

export const getPostInfo = async (token, postId) => {
    try {
        return await bookLinkAxios.get(`/post/${postId}`, config(token))
    } catch (error) {
        return error.response
    }
}

export const getPosts = async (token, forumId) => {
    try {
        return await bookLinkAxios.get(`/post/forum/${forumId}`, config(token))
    } catch (error) {
        return error.response
    }
}

export const likePost = async (token, postId) => {
    try {
        return await bookLinkAxios.post(`/post/${postId}/toggle-like`, undefined, config(token))
    } catch (error) {
        return error.response
    }
}

export const dislikePost = async (token, postId) => {
    try {
        return await bookLinkAxios.post(`/post/${postId}/toggle-dislike`, undefined, config(token))
    } catch (error) {
        return error.response
    }
}

export const deletePost = async (token, id) => {
    return await bookLinkAxios.delete(`/post/${id}`, config(token))
}
