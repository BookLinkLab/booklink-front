import "./styles.css"
import PropTypes from "prop-types"
import { useField } from "formik"

const CustomTextField = (props) => {
    const { variant = "default", label, helpText, className, ...otherProps } = props

    const [field, meta] = useField(props)
    const helperTextFinal = meta.error ?? helpText
    return (
        <div className={"textfield-style " + className}>
            {label && <label className="body2 labelTextField">{label}</label>}
            <input className={variant} {...field} {...otherProps}></input>
            {helperTextFinal && <small className="body3 smallTextField">{helperTextFinal}</small>}
        </div>
    )
}

CustomTextField.propTypes = {
    variant: PropTypes.oneOf(["default", "error", "placeholder"]),
    label: PropTypes.string,
    className: PropTypes.string,
    helpText: PropTypes.string,
    placeholder: PropTypes.string,
}
export default CustomTextField
