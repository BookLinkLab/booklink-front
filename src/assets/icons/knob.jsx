export const Knob = ({ width, height }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 26 26"
            fill="none"
        >
            <g filter="url(#filter0_ddd_41_7836)">
                <circle cx="13" cy="12" r="10" fill="white" />
            </g>
            <defs>
                <filter
                    id="filter0_ddd_41_7836"
                    x="0"
                    y="0"
                    width="26"
                    height="26"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feMorphology
                        radius="1"
                        operator="erode"
                        in="SourceAlpha"
                        result="effect1_dropShadow_41_7836"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_41_7836"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="0.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.14 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="effect1_dropShadow_41_7836"
                        result="effect2_dropShadow_41_7836"
                    />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="1.5" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.12 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="effect2_dropShadow_41_7836"
                        result="effect3_dropShadow_41_7836"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect3_dropShadow_41_7836"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    )
}
