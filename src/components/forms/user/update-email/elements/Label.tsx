export const Label = ({ children, ...rest }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
    <>
        <label
            className="absolute inset-0
            rounded
            border dark:border-middark border-midlight
            peer-focus:border-primary
            peer-invalid:border-red-600
            transition-all"
            {...rest}
        />
        <span
            className="select-none pointer-events-none
            absolute top-1 left-2
            w-fit dark:text-midlight/75 text-middark/75 font-semibold
            peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-primary peer-focus:text-sm
            peer-valid:top-1 peer-valid:translate-y-0 peer-valid:text-sm
            peer-invalid:top-1/2 peer-invalid:-translate-y-1/2 peer-invalid:text-md peer-invalid:text-red-600
            transition-all"
        >
            {children}
        </span>
    </>

)