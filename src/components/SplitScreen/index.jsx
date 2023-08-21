import "./styles.css"

const SplitScreen = ({ children }) => {
    //If there is a way to make the screen divide in half without a parent component, it would be better
    return (
        <div className="split-screen-div">
            <div className="left-side"></div>
            <div className="right-side">{children}</div>
        </div>
    )
}
export default SplitScreen
