import "./styles.css"
import { Knob } from "../../assets/icons/knob.jsx"

const Switch = ({ state, OnClick }) => {
    return (
        <div className={"slide-div"}>
            <div
                className={"slide"}
                style={{
                    backgroundColor: state === "on" ? "var(--primary-500)" : "var(--grey-300)",
                }}
            ></div>
            <div className={"knob " + (state === "on" ? "left" : "right")} onClick={OnClick}>
                <Knob width={26} height={26} />
            </div>
        </div>
    )
}
export default Switch
