import { clsx } from "clsx";
import { Comment, Page, Reply, Token } from "@/core"
import { IconArrowForward } from "@tabler/icons-react";
import { useServices } from "@/data/hooks";
import { useTransition } from "react";

interface LoadMoreProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    token: Token | null;
    isRepliesListOpen: boolean;
    comment: Comment;
    page: Omit<Page<Reply>, 'content'>;
    setPage: React.Dispatch<React.SetStateAction<Omit<Page<Reply>, 'content'>>>;
    setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
}

export const Loader = ({ token, isRepliesListOpen, comment, page, setPage, setReplies, ...rest }: LoadMoreProps) => {

    const { replyService: { getReplies } } = useServices();

    const [isPending, startTransition] = useTransition();

    const handleClick = () => startTransition(async () => {
        const accessToken = token ? token.access_token : null;
        const { content, ...rest } = await getReplies(accessToken, comment.id, `page=${page.page + 1}`);
        setReplies(prev => [...prev, ...content]);
        setPage(rest);
    })

    if (isRepliesListOpen && !page.last) return (
        <button
            disabled={isPending}
            onClick={handleClick}
            className={clsx(
                'disabled:cursor-wait',
                'ml-10 p-2 insm:px-1 rounded-full',
                'flex items-center gap-1',
                'font-medium text-sm insm:text-xs',
                'dark:text-secondary text-primary',
                'dark:hover:secondary/20 hover:bg-primary/20'
            )}
            {...rest}
        >
            <IconArrowForward size={16} />
            Carregar mais
        </button>
    )

}