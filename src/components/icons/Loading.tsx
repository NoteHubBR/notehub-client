interface LoadingProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: number;
}

export const Loading = ({ size = 75, className, ...rest }: LoadingProps) => (
    <figure
        data-whatever={size}
        role="status"
        aria-hidden="true"
        aria-label="Carregando"
        className={`select-none pointer-events-none ${className}`}
        {...rest}
    >
        <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 300 150'
            width={size}
            height={size}
            className="m-auto"
        >
            <path
                strokeWidth='15'
                strokeLinecap='round'
                strokeDasharray='300 385'
                strokeDashoffset='0'
                d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'
                className="stroke-primary fill-none"
            >
                <animate
                    attributeName='stroke-dashoffset'
                    calcMode='spline'
                    dur='2'
                    values='685;-685'
                    keySplines='0 0 1 1'
                    repeatCount='indefinite'
                />
            </path>
        </svg>
    </figure>
)