import { Element } from "./elements";
import { LowDetailUser } from "@/core";
import { Toggle } from "@/components/buttons";
import { useScreen } from "@/data/hooks";

interface UserProps extends React.HTMLAttributes<HTMLElement> {
    user: LowDetailUser;
}

export const User = ({ user, ...rest }: UserProps) => {

    const { onDesktop } = useScreen();

    const { User, Username } = Element;

    return (
        <>
            <article
                className="relative w-full p-3 rounded-md
                flex flex-col items-start gap-3
                dark:bg-darker bg-lighter
                border dark:border-middark/50 border-midlight/50"
                {...rest}
            >
                <header className="relative pl-14 flex flex-col">
                    <User user={user} />
                    <Username>@{user.username}</Username>
                </header>
                <section className="-mt-1 pl-14 pr-36 inmd:pr-0 insm:pl-0">
                    <p>{user.message}</p>
                </section>
                <Toggle.Follow
                    user={user}
                    useIcon
                    useText={onDesktop}
                    className="!absolute !top-1/2 -translate-y-1/2 !right-5
                    inmd:!top-3 inmd:translate-y-0 inmd:!w-fit inmd:!p-2"
                />
            </article>
        </>
    )

}