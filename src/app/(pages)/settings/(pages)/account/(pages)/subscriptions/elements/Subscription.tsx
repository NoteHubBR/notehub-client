import { clsx } from "clsx";
import { Icon } from "@/components/icons";
import { Subscription as Sub } from "@/core";
import { useServices, useSubscriptions, useUser } from "@/data/hooks";
import { useTransition } from "react";

interface SubscriptionProps extends React.LiHTMLAttributes<HTMLLIElement> {
    sub: Sub
    name: string;
}

export const Subscription = ({ sub, name, ...rest }: SubscriptionProps) => {

    const { userService: { enableSubscription, disableSubscription } } = useServices();

    const { token } = useUser();
    const { subscriptions, setSubscriptions } = useSubscriptions();
    const [isPending, startTransition] = useTransition();

    const isAllowed = subscriptions.includes(sub);

    const handleClick = (): void => startTransition(async (): Promise<void> => {
        if (token) {
            if (isAllowed) {
                await disableSubscription(token.access_token, sub);
                return setSubscriptions(subscriptions.filter(s => s !== sub));
            } else {
                await enableSubscription(token.access_token, sub);
                return setSubscriptions([...subscriptions, sub]);
            }
        }
        return;
    })

    return (
        <li className="relative px-4 py-3 flex items-center justify-between" {...rest}>
            {isPending &&
                <div
                    role="status"
                    className="cursor-wait
                    z-10 absolute inset-0 rounded-full
                    flex items-center justify-center
                    dark:bg-middark/75 bg-midlight/75"
                >
                    <Icon.Dots />
                </div>
            }
            <p>{name}</p>
            <button
                onClick={handleClick}
                className={clsx(
                    'relative w-[48px] h-[24px] rounded-full border-2',
                    'after:absolute after:top-0 after:left-0 after:w-[50%] after:h-full after:rounded-full after:dark:bg-darker after:bg-lighter',
                    isAllowed ? 'after:translate-x-full' : 'after:translate-x-0',
                    isAllowed
                        ? 'dark:border-lighter border-darker dark:bg-lighter bg-darker'
                        : 'dark:border-middark border-midlight dark:bg-middark bg-midlight',
                    'transition-all duration-300 after:transition-all after:duration-300',
                )}
            />
        </li>
    )

}