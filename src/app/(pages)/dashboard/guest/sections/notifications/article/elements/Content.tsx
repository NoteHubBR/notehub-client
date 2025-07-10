interface ContentProps extends React.HTMLAttributes<HTMLDivElement> {
    emote: React.ElementType;
    sender: string;
    message: string;
}

export const Content = ({ emote: Emote, sender, message, ...rest }: ContentProps) => (
    <div className="px-2" {...rest}>
        <p className="line-clamp-6 text-sm">
            <span>{<Emote className="inline-block text-secondary fill-secondary" />}</span>
            <span className="font-semibold text-secondary"> @{sender} </span>
            <span>{message}</span>
        </p>
    </div>
)