import { Element } from "./elements";
import { LowDetailUser } from "@/core";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
    users: LowDetailUser[];
}

export { Skeleton as main } from './skeleton';

export const Main = ({ users, ...rest }: MainProps) => (
    <main className="my-4 flex flex-1 items-center justify-center gap-3 flex-wrap" {...rest}>
        {users.map((user) => (
            <Element.Wrapper key={user.username}>
                <Element.Section user={user}>
                    <Element.Overlay />
                    <Element.Button user={user} />
                    <Element.User user={user} />
                    <Element.Count user={user} />
                </Element.Section>
            </Element.Wrapper>
        ))}
    </main>
)