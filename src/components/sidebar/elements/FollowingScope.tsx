import { Button } from "./Button";
import { Field } from "./Field";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { LowDetailUser } from "@/core";
import { useCallback, useState } from "react";
import { UserLink } from "./UserLink";
import { useUser } from "@/data/hooks";
import Link from "next/link";

export const FollowingScope = () => {

    const { following } = useUser();

    const sliced = following.slice(0, 6);

    const [listState, setListState] = useState<LowDetailUser[]>(sliced);

    const isExpanded = listState.length === following.length;

    const toggleList = useCallback(() => {
        setListState(isExpanded ? sliced : following);
    }, [following, sliced, isExpanded]);

    return (
        <div className="flex flex-col gap-3">
            {listState.map(user => (
                <Field key={user.username}>
                    <Link href={`/${user.username}`}>
                        <UserLink avatar={user.avatar} username={user.username} />
                    </Link>
                </Field>
            ))}
            {following.length > sliced.length && (
                <Field>
                    <Button
                        icon={isExpanded ? <IconChevronUp size={27} /> : <IconChevronDown size={27} />}
                        text={isExpanded ? "Mostrar menos" : "Mostrar mais"}
                        onClick={toggleList}
                    />
                </Field>
            )}
        </div>
    );
    
}