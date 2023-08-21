import "./styles.css"
import PropTypes from "prop-types"

const Button = ({
    variant = "fulfilled",
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    disabled = false,
    OnClick,
    children,
    size = "large",
}) => {
    return (
        <>
            <button className={variant + " " + size} disabled={disabled} onClick={OnClick}>
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
        </>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(["fulfilled", "ghost", "outlined"]),
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["large", "medium", "small"]),
}
export default Button
