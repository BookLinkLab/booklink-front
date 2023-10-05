import "./styles.css"
import Button from "../Button"
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
                    {({ handleChange, values, dirty }) => (
                        <Form className="input-container">
                            <textarea
                                value={initialValue}
                                name={"updatedComment"}
                                onChange={(e) => {
                                    handleChange(e)
                                    handleInputChange(e.target.value)
                                }}
                            ></textarea>
                            <div className="modal-buttons">
                                <Button onClick={firstButtonAction} variant="outlined">
                                    {firstButton}
                                </Button>
                                <Button onClick={secondButtonAction} disabled={!dirty}>
                                    {secondButton}
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}

export default TextInputModal
