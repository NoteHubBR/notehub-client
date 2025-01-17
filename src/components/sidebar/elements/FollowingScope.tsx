import { Button } from "./Button";
import { Field } from "./Field";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { LowDetailUser } from "@/core";
import { useEffect, useState } from "react";
import { UserLink } from "./UserLink";
import { useUser } from "@/data/hooks";
import Link from "next/link";

export const FollowingScope = () => {

    const { following } = useUser();

    const sliced = following.slice(0, 1);

    const [listState, setListState] = useState<LowDetailUser[]>([]);

    useEffect(() => { setListState(sliced) }, [following])

    const isExpanded = listState.length === following.length;

    const toggleList = (): void => { return setListState(isExpanded ? sliced : following) }

    return (
        <div className="flex flex-col gap-3">
            {listState.map(user => (
                <Field key={user.username}>
                    <Link href={`/${user.username}`}>
                        <UserLink avatar={user.avatar} username={user.username} />
                    </Link>
                </Field>
            ))}
            <Field>
                <Button
                    icon={isExpanded ? <IconChevronUp size={27} /> : <IconChevronDown size={27} />}
                    text={isExpanded ? "Mostrar menos" : "Mostrar mais"}
                    onClick={toggleList}
                />
            </Field>
        </div>
    )

}