export const Submit = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            aria-label="Salvar"
            className="py-2 px-4 rounded-full
            font-medium text-xs
            dark:text-black text-white
            dark:bg-white bg-black
            hover:opacity-75 transition-opacity"
            {...props}
        />
    )
}