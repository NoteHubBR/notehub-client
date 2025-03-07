export const Textarea = (props: React.HTMLAttributes<HTMLTextAreaElement>) => {
    return (
        <textarea
            className="resize-none peer outline-none dark:font-light
            w-full px-2 py-1 pt-6
            border border-neutral-700/70 rounded
            dark:bg-black bg-white
            focus:border-violet-600
            invalid:border-red-500
            transition-all"
            required
            {...props}
        />
    )
}