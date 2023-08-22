import LogoSVG from "../../assets/icons/logo.jsx"
import "./styles.css"
import PropTypes from "prop-types"

const Logo = ({ size, name = true }) => {
    const sizes = {
        small: "h6",
        medium: "h3",
        large: "h2",
    }
    const logoSizes = {
        small: "28px",
        medium: "54px",
        large: "72px",
    }
    const Header = sizes[size]

    return (
        <div className={"logo-div"} style={{ gap: size === "small" ? 4 : 8 }}>
            <LogoSVG width={logoSizes[size]} height={logoSizes[size]} />
            {name && (
                <Header className={sizes[size]}>
                    <b>Book</b>Link
                </Header>
            )}
        </div>
    )
}

Logo.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large"]),
    name: PropTypes.bool,
}

export default Logo
