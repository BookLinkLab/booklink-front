import "./styles.css"
import PropTypes from "prop-types"

const SplitScreen = ({ leftSide: LeftSide, rightSide: RightSide }) => {

    //If there is a way to make the screen divide in half without a parent component, it would be better
    return (
        <div className="split-screen-div">
            <LeftSide className="left-side" />
            <RightSide className="right-side" />
        </div>
    )

}
SplitScreen.propTypes = {
    leftSide: PropTypes.node,
    rightSide: PropTypes.node
}

export default SplitScreen