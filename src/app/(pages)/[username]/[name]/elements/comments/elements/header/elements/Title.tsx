interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    count: number;
}

export const Title = ({ count, ...rest }: TitleProps) => (
    <h6
        className="whitespace-nowrap font-medium"
        {...rest}
    >
        {count > 0
            ? count > 1
                ? `${count} Comentários`
                : `${count} Comentário`
            : 'Nenhum comentário'
        }
    </h6>
)