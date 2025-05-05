import { Element } from "./elements";

export const Header = (props: React.HTMLAttributes<HTMLElement>) => {

    const { Title, Filter } = Element;

    return (
        <header className="p-3 pt-0 flex items-center justify-between" {...props}>
            <Title>Feed</Title>
            <Filter />
        </header>
    )

}