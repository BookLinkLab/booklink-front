import "./styles.css"
import Button from "../Button"
import { Remove } from "../../assets/icons/remove"

const Modal = ({
    title,
    subtitle,
    firstButtonText,
    secondButtonText,
    firstButtonAction,
    secondButtonAction,
    handleOnClose,
    className,
}) => {
    return (
        <div className={`modal-container ${className ?? ""}`}>
            <div className="modal-main-div">
                <div className="remove-div" onClick={handleOnClose}>
                    <Remove width={18} height={18} />
                </div>
                <div className="text-modal-div">
                    <h5 className="text-modal">{title}</h5>
                    <p className="body2">{subtitle}</p>
                </div>
                <div className="buttons-modal-div">
                    <Button
                        variant="outlined"
                        size="medium"
                        className={"button-width"}
                        onClick={firstButtonAction}
                    >
                        {firstButtonText}
                    </Button>
                    <Button size="medium" className={"button-width"} onClick={secondButtonAction}>
                        {secondButtonText}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Modal
