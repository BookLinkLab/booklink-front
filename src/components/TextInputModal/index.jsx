import "./styles.css"
import CustomTextField from "../TextField"
import Button from "../Button"
import { Remove } from "../../assets/icons/remove"
import { Form, Formik } from "formik"
const TextInputModal = ({
    title,
    handleInputChange,
    initialValue,
    firstButton,
    secondButton,
    firstButtonAction,
    secondButtonAction,
}) => {
    return (
        <div className="modal-container">
            <div className="modal-main-div">
                <h5 className="title-style bold">{title}</h5>

                <Formik initialValues={{ updatedComment: initialValue }}>
                    {({ dirty, values, handleChange }) => (
                        <Form className="input-container">
                            <textarea
                                name={"updatedComment"}
                                onChange={(e) => {
                                    handleChange(e)
                                    handleInputChange(e.target.value)
                                }}
                            ></textarea>
                        </Form>
                    )}
                </Formik>
                <div className="modal-buttons">
                    <Button onClick={firstButtonAction} variant="outlined">
                        {firstButton}
                    </Button>
                    <Button onClick={secondButtonAction}>{secondButton}</Button>
                </div>
            </div>
        </div>
    )
}

export default TextInputModal
