export const Wrapper = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className="rounded-md border-2 dark:border-midlight/5 border-middark/5
        flex items-center justify-items-center
        dark:bg-midlight/50 bg-middark/50
        dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
        [&:has(input:focus)]:border-primary [&:has(input:focus)]:bg-primary
        [&:has(input:valid)]:border-primary [&:has(input:valid)]:bg-primary
        [&:has(button:hover)]:!border-red-600 [&:has(button:hover)]:!bg-red-600
        [&:has(button:disabled)]:!border-red-600 [&:has(button:disabled)]:!bg-red-600
        transition-colors"
        {...props}
    />
)