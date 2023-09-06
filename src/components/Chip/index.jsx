import "./styles.css"
const Chip = ({ children }) => {
    return (
        <div className="chip-style">
            <p className="chip-text-style body3bold">{children}</p>
        </div>
    )
}
export default Chip
