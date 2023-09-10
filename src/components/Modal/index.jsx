import "./styles.css"
import Button from "../Button"
import { Remove } from "../../assets/icons/remove"
import { useState } from "react"

const Modal = ({
    title,
    subtitle,
    firstButtonText,
    secondButtonText,
    firstButtonAction,
    secondButtonAction,
    showModal,
}) => {
    const [modal, setShowModal] = useState(showModal)
    if (modal) {
        return (
            <div className="modal-main-div">
                <div className="remove-div" onClick={() => setShowModal(false)}>
                    <Remove width={18} height={18} />
                </div>
                <div className="text-modal-div">
                    <h5 className="text-modal">{title}</h5>
                    <p className="body2">{subtitle}</p>
                </div>
                <div className="buttons-modal-div">
                    <div className="button-width">
                        <Button variant="outlined" size="medium" onClick={firstButtonAction}>
                            {firstButtonText}
                        </Button>
                    </div>
                    <div className="button-width">
                        <Button size="medium" onClick={secondButtonAction}>
                            {secondButtonText}
                        </Button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Modal
