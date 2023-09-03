import "./styles.css"
const Chip = ({ children, ...props }) => {
    return (
        <div className="chip-style" {...props}>
            <p className="chip-text-style body3bold">{children}</p>
        </div>
    )
}
export default Chip
