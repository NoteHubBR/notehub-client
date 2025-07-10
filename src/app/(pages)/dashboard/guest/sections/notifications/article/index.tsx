import { Content, Sender, Time } from "./elements";
import { useState } from "react";

interface ArticleProps extends React.HTMLAttributes<HTMLElement> {
    emote: React.ElementType;
    photo: string;
    sender: string;
    message: string;
    date: string;
    createdAt: string;
}

export const Article = ({ emote: Emote, photo, sender, message, date, createdAt, ...rest }: ArticleProps) => {

    const [isMouseOnDateField, setIsMouseOnDateField] = useState<boolean>(false);
    const handleMouseEnter = () => setIsMouseOnDateField(true);
    const handleMouseLeave = () => setIsMouseOnDateField(false);

    return (
        <li>
            <article
                className="cursor-pointer
                py-2 rounded-md
                inmd:flex inmd:flex-col inmd:gap-1
                hover:dark:bg-semilight/10 hover:bg-semidark/10
                transition-colors"
                {...rest}
            >
                <section className="flex items-center">
                    <Sender photo={photo} />
                    <Content emote={Emote} sender={sender} message={message} />
                </section>
                <footer className="w-full flex justify-end">
                    <Time
                        isMouseOnDateField={isMouseOnDateField}
                        date={date}
                        createdAt={createdAt}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                    />
                </footer>
            </article>
        </li>
    )

}