import { Element } from "./elements";
import { LowDetailUser } from "@/core";
import { Toggle } from "@/components/buttons";

interface MainProps extends React.HTMLAttributes<HTMLElement> {
    users: LowDetailUser[];
}

export { Skeleton as main } from './skeleton';

export const Main = ({ users, ...rest }: MainProps) => (
    <main className="my-4 flex-1" {...rest}>
        <ul className="w-full flex items-center justify-center gap-3 flex-wrap">
            {users.map((user) => (
                <Element.Li key={user.username}>
                    <Element.Section user={user}>
                        <Element.Overlay />
                        <Element.User user={user} />
                        <Toggle.Follow
                            user={user}
                            useIcon
                            className="!absolute !top-1 !right-1 !w-fit !rounded-full !p-2 !text-white"
                        />
                        <Element.Count user={user} />
                    </Element.Section>
                </Element.Li>
            )
            )}
        </ul>
    </main>
)