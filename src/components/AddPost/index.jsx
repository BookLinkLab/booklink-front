import React from "react"
import "./styles.css"
import CustomTextField from "../TextField"
import Button from "../Button"
import { Form, Formik } from "formik"

const AddPost = ({ buttonText, textFieldPlaceholder, onClick }) => {
    const handleAddPost = () => {}

    return (
        <div>
            <Formik
                initialValues={{ comment: "" }}
                onSubmit={(values, { resetForm }) => {
                    const commentValue = values.comment
                    onClick(handleAddPost(console.log(commentValue)))
                    resetForm()
                }}
            >
                {({ values, handleChange }) => (
                    <Form>
                        <div className="addPost">
                            <img src={require("../../assets/images/profile.png")} alt="Profile" />
                            <div className="addPostTextField">
                                <CustomTextField
                                    variant="placeholder"
                                    placeholder={textFieldPlaceholder}
                                    name="comment"
                                    value={values.comment}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button
                                type="submit"
                                size="large"
                                variant="fulfilled"
                                disabled={values.comment === ""}
                            >
                                {`${buttonText}`}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default AddPost
