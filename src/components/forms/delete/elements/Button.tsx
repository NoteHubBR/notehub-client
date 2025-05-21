export const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button
        type="submit"
        className="whitespace-nowrap px-2 text-sm text-white"
        {...props}
    />
)