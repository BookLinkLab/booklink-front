import { Backdrop, CircularProgress } from "@mui/material"

const Loader = ({ open }) => {
    return (
        <Backdrop
            open={open} // true to show
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color={"inherit"} />
        </Backdrop>
    )
}
export default Loader
