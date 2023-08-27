import { useState } from "react"
//This hooks works correctly but when unpacked the name of the variable and function have to be the same as stated here.

export const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState({
        access_token: localStorage.getItem("access_token"),
        id: localStorage.getItem("user_id"),
    })

    const changeCurrentUser = (token, id) => {
        localStorage.setItem("access_token", token)
        localStorage.setItem("user_id", id)
        setCurrentUser({ access_token: token, id: id })
    }
    return { currentUser, changeCurrentUser }
}
