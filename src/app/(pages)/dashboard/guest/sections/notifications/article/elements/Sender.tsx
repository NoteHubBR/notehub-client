import { Component } from "@/components";

interface SenderProps extends React.HTMLAttributes<HTMLDivElement> {
    photo: string;
}

export const Sender = ({ photo, ...rest }: SenderProps) => (
    <div
        className="relative px-2 border-r text-sm dark:border-r-semilight/10 border-r-semidark/10"
        {...rest}
    >
        <Component.Mock src={photo} size={55} />
    </div>
)