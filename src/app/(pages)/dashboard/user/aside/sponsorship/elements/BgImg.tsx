export const BgImg = (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 opacity-10'
        style={{
            backgroundImage: 'url(/imgs/verified.png)',
            backgroundSize: '185px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right',
        }}
        {...props}
    />
)