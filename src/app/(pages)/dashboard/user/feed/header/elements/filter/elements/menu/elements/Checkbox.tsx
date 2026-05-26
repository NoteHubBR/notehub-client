interface Props extends React.InputHTMLAttributes<HTMLInputElement> { }

export const Checkbox = (props: Props) => (
    <input
        type='checkbox'
        className='self-start mt-1'
        {...props}
    />
)