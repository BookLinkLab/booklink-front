import "./styles.css"
import PropTypes from "prop-types"

const Button = ({
    variant = "fulfilled",
    type = "submit",
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    disabled = false,
    className,
    onClick,
    children,
    size = "large",
}) => {
    const fontSize = {
        large: "body1",
        medium: "body2",
        small: "body3",
    }

    return (
        <button
            className={variant + " " + size + " " + fontSize[size] + " " + className}
            disabled={disabled}
            onClick={onClick}
            type={type}
        >
            {!!LeftIcon && (
                <LeftIcon
                    color={variant === "fulfilled" ? "white" : "#94313E"}
                    size={size === "large" ? 18 : 16}
                />
            )}
            {children}
            {!!RightIcon && (
                <RightIcon
                    color={variant === "fulfilled" ? "white" : "#94313E"}
                    size={size === "large" ? 18 : 16}
                />
            )}
        </button>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(["fulfilled", "ghost", "outlined"]),
    type: PropTypes.string,
    className: PropTypes.string,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["large", "medium", "small"]),
}
export default Button
