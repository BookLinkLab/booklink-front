import "./styles.css"
const Chip = ({ tag }) => {
    return (
        <div className="chip-style">
            <p className="chip-text-style body3bold">{tag}</p>
        </div>
    )
}
export default Chip
