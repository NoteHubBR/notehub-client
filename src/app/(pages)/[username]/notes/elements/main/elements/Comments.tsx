import { clsx } from "clsx";
import { IconMessageCircle, IconMessageCircleOff } from "@tabler/icons-react";
import { LowDetailNote } from "@/core";
import Link from "next/link";

export const Comments = ({ note }: { note: LowDetailNote }) => {

    const { id, user, closed: isClosed, comments_count: count } = note;

    return (
        <Link
            href={`/${user ? user.username : 'user'}/${id}`}
            className={clsx(
                isClosed && 'pointer-events-none cursor-not-allowed select-none',
                'px-2 py-1 rounded-md insm:rounded-full',
                'flex items-center gap-1',
                'insm:dark:bg-lighter/25 insm:bg-darker/25',
                'hover:dark:bg-semidark hover:bg-semilight',
                'hover:dark:drop-shadow-alpha-l-sm hover:drop-shadow-alpha-d-sm',
                'active:scale-110',
                'transition-all'
            )}
        >
            <span>
                {isClosed
                    ? <IconMessageCircleOff size={20} className="insm:!text-white" />
                    : <IconMessageCircle size={20} className="insm:!text-white" />
                }
            </span>
            {count > 0 &&
                <span className="text-sm insm:text-white">
                    {count}
                </span>
            }
            <span className="insm:hidden text-sm">
                {isClosed ? 'Fechado' : count > 0 ? count > 1 ? 'Comentários' : 'Comentário' : 'Comentar'}
            </span>
        </Link>
    )

}