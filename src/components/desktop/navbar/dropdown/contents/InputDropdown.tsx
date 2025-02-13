export const InputDropdown = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <section className="pointer-events-none peer-focus:pointer-events-auto
            max-h-0 peer-focus:max-h-[200px]
            overflow-y-auto scrollbar
            absolute top-[110%]
            w-full p-0 peer-focus:py-1 rounded-lg
            dark:bg-neutral-800 bg-neutral-50
            transition-all"
            style={{ filter: 'drop-shadow(0 0 2px rgba(0, 0, 0, .2))' }}
            onMouseDown={(e: React.MouseEvent) => { e.preventDefault() }}
            {...props}
        />
    )
}