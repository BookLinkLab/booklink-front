export const Ellipse = ({ height, width, color }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 4 5"
            fill={color}
        >
            <circle cx="2" cy="2.5" r="2" fill="black" />
        </svg>
    )
}
