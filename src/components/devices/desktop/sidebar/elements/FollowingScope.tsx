import { Button } from "./Button";
import { clsx } from "clsx";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Link } from "./Link";
import { LowDetailUser } from "@/core";
import { Photo } from "@/components";
import { useCallback, useEffect, useState } from "react";
import { useFollowing } from "@/data/hooks";

export const FollowingScope = () => {

    const { users: following } = useFollowing();

    const sliced = following ? following.slice(0, 6) : [];

    const [listState, setListState] = useState<LowDetailUser[]>(sliced);

    const isExpanded = following ? listState.length === following.length : true;

    const toggleList = useCallback(() => {
        setListState(isExpanded ? sliced : (following ?? []));
    }, [following, sliced, isExpanded]);

    useEffect(() => { setListState(sliced) }, [following]);

    return (
        <div className="flex flex-col gap-3">
            <ul aria-label='Seguindo' className="flex flex-col gap-3">
                {listState.map(user => (
                    <li key={user.username}>
                        <Link
                            user={user}
                            href={`/${user.username}`}
                            icon={<Photo user={user} />}
                            useBadge={user.dev ? 'dev' : user.sponsor ? 'sponsor' : 'none'}
                            text={user.username}
                        />
                    </li>
                ))}
            </ul>
            {(following ? following.length : 0) > sliced.length && (
                <div className={clsx(
                    'cursor-pointer',
                    'rounded-md',
                    'hover:dark:bg-semilight/10 hover:bg-semidark/10',
                    'transition-colors'
                )}>
                    <Button
                        icon={isExpanded ? <IconChevronUp size={27} /> : <IconChevronDown size={27} />}
                        text={isExpanded ? "Mostrar menos" : "Mostrar mais"}
                        onClick={toggleList}
                    />
                </div>
            )}
        </div>
    );

}