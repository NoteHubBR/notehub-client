const Separator = (props: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className='flex items-center justify-between gap-4 my-4' {...props}>
            <hr className='w-full border-s border-primary/50' />
            <span className='break-keep font-bold text-xs'>OU</span>
            <hr className='w-full border-s border-primary/50' />
        </div>
    )
}

export default Separator;