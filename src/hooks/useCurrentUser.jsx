import { useEffect, useState } from "react"
//This hooks works correctly but when unpacked, the name of the variable and function have to be the same as stated here.

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState({
        token: localStorage.getItem("access_token"),
        id: localStorage.getItem("user_id"),
    })

    const updateState = () => {
        setCurrentUser({
            token: localStorage.getItem("access_token"),
            id: localStorage.getItem("user_id"),
        })
    }

    const isAuthenticated = () => {
        //With the token I think it is enough to know if the user is authenticated
        return !!currentUser.token
    }

    const changeCurrentUser = (token, id) => {
        localStorage.setItem("access_token", token)
        localStorage.setItem("user_id", id)
    }

    const logOutCurrentUser = () => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("user_id")
    }

    useEffect(() => {
        window.addEventListener("storage", updateState)
        return () => {
            window.removeEventListener("storage", updateState)
        }
    }, [])

    return {
        id: currentUser.id,
        token: currentUser.token,
        changeCurrentUser,
        isAuthenticated,
        logOutCurrentUser,
    }
}
