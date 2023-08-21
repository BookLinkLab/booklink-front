import "./styles.css"
import PropTypes from "prop-types"
import { useField } from "formik"

const TextField = (props) => {
    const { variant = "default", label, helpText, ...otherProps } = props

    const [field, meta] = useField(props)
    return (
        <div className="textfield-style">
            <label className="body2 labelTextField">{label}</label>
            <input className={variant} {...field} {...otherProps}></input>
            {(meta.error ?? helpText) && (
                <small className="body3 smallTextField">{meta.error}</small>
            )}
        </div>
    )
}

TextField.propTypes = {
    variant: PropTypes.oneOf(["default", "error", "placeholder"]),
    label: PropTypes.string,
    helpText: PropTypes.string,
    placeholder: PropTypes.string,
}
export default TextField
