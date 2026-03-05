import { clsx } from "clsx";
import { Comment, Reply, Token } from "@/core"
import { IconArrowForward } from "@tabler/icons-react";
import { useServices } from "@/data/hooks";

interface LoadMoreProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    token: Token | null;
    isRepliesListOpen: boolean;
    comment: Comment;
    setReplies: React.Dispatch<React.SetStateAction<Reply[]>>;
}

export const Loader = ({ token, isRepliesListOpen, comment, setReplies, ...rest }: LoadMoreProps) => {

    const { replyServiceQueries: { useGetReplies } } = useServices();

    const accessToken = token ? token.access_token : null;
    const { fetchNextPage, hasNextPage, isFetchingNextPage } = useGetReplies(accessToken, comment.id, false);

    const handleClick = () => {
        fetchNextPage().then((result) => {
            if (result.data) {
                const lastPage = result.data.pages.at(-1);
                const replies = lastPage ? lastPage.content : [];
                setReplies(prev => [...prev, ...replies]);
            }
        })
    }

    if (isRepliesListOpen && hasNextPage) return (
        <button
            disabled={isFetchingNextPage}
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

    return null;

}