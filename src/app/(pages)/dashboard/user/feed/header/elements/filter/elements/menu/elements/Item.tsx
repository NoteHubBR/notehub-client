interface Props extends React.HTMLAttributes<HTMLDivElement> {
    icon: React.ElementType;
    label: 'Seguindo' | 'Notas' | 'Chamas' | 'Comentários';
    tip: string;
}

export const Item = ({ icon: Icon, label, tip }: Props) => (
    <div>
        <header className='flex items-center gap-1'>
            <Icon size={18} />
            <p className='text-sm'>{label}</p>
        </header>
        <span className='text-xs dark:text-lighter/50 text-darker/50'>{tip}</span>
    </div>
)