interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    icon?: React.ReactNode;
    text: string;
    strong?: boolean;
    reverse?: boolean;
}

export const Button = (props: ButtonProps) => {

    const { icon, text, strong, reverse, ...rest } = props;

    return (
        <button className="flex items-center gap-3" {...rest} >
            {!reverse
                ?
                <>
                    {icon && icon}
                    {strong
                        ?
                        <strong><span className="text-center text-md">{text}</span></strong>
                        :
                        <span className="text-center text-sm">{text}</span>
                    }
                </>
                :
                <>
                    {strong
                        ?
                        <strong><span className="text-center text-md">{text}</span></strong>
                        :
                        <span className="text-center text-sm">{text}</span>
                    }
                    {icon && icon}
                </>
            }
        </button>
    )

}