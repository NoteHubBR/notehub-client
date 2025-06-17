import { clsx } from "clsx";
import { IconChevronDown } from "@tabler/icons-react";

interface ChevronIconProps {
    isRepliesListOpen: boolean;
    repliesCount: number;
}

export const ChevronIcon = ({ isRepliesListOpen, repliesCount }: ChevronIconProps) => (
    <>
        <IconChevronDown
            size={16}
            className={clsx(
                isRepliesListOpen ? 'rotate-180' : 'rotate-0',
                'transition-all'
            )}
        />
        {repliesCount > 1
            ? `${repliesCount} respostas`
            : `${repliesCount} resposta`
        }
    </>
)