export const Text = (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
        {...props}
        id='cookie-consent-text'
        className='text-wrap text-sm insm:text-xs dark:text-dark text-light'
    />
)