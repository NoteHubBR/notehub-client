import { Button } from "./Button";
import { clsx } from "clsx";
import { Component } from "@/components";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { Link } from "./Link";
import { LowDetailUser } from "@/core";
import { useCallback, useEffect, useState } from "react";
import { useFollowing } from "@/data/hooks";

export const FollowingScope = () => {

    const { users: following } = useFollowing();

    const sliced = following.slice(0, 6);

    const [listState, setListState] = useState<LowDetailUser[]>(sliced);

    const isExpanded = listState.length === following.length;

    const toggleList = useCallback(() => {
        setListState(isExpanded ? sliced : following);
    }, [following, sliced, isExpanded]);

    useEffect(() => { setListState(sliced) }, [following]);

    return (
        <div className="flex flex-col gap-3">
            {listState.map(user => (
                <Link
                    user={user}
                    key={user.username}
                    href={`/${user.username}`}
                    icon={<Component.Photo user={user} />}
                    useBadge={user.sponsor}
                    text={user.username}
                />
            ))}
            {following.length > sliced.length && (
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