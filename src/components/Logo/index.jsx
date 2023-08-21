import LogoSVG from "../../assets/icons/logo.jsx"
import "./styles.css"

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
            <div className={size + "-logo svg-div"}>
                <LogoSVG width={logoSizes[size]} height={logoSizes[size]} />
            </div>
            <div>
                {name ? (
                    <div className="inline-container">
                        <Header className={sizes[size] + " bold"}>Book</Header>
                        <Header className={sizes[size]}>Link</Header>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default Logo
