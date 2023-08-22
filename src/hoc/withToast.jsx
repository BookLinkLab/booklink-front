import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const withToast = (Component) => (props) => {
    const showToast = (message, type = "info") => {
        const toastOptions = {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: false,
            theme: "colored",
            toastId: "Id",
        }

        switch (type) {
            case "success":
                toast.success(message, toastOptions)
                break
            case "error":
                toast.error(message, toastOptions)
                break
            case "warning":
                toast.warning(message, toastOptions)
                break
            default:
                toast.info(message, toastOptions)
                break
        }
    }

    return (
        <>
            <Component {...props} showToast={showToast} />
            <ToastContainer />
        </>
    )
}
export default withToast
