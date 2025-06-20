import { IconMessageCircle, IconMessageCircleOff } from "@tabler/icons-react";
import { Note } from "@/core";

interface CommentsProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    note: Note;
}

export const Comments = ({ note, ...rest }: CommentsProps) => {

    const scrollToCommentBox = () => {
        const commentWrapperEl = document.getElementById("comment-wrapper");
        const commentBoxEl = document.getElementById("comment");
        if (commentWrapperEl) commentWrapperEl.scrollIntoView({ behavior: "smooth" });
        if (commentBoxEl) commentBoxEl.focus({ preventScroll: true });
    }

    return (
        <span className="flex items-center gap-2">
            <button
                onClick={scrollToCommentBox}
                className="w-fit p-1 rounded-full
                text-white
                dark:bg-lighter/25 bg-darker/25
                dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm
                dark:hover:bg-primary hover:bg-primary
                active:scale-110
                transition-all"
                {...rest}
            >
                {note.closed ? <IconMessageCircleOff size={20} /> : <IconMessageCircle size={20} />}
            </button>
            {note.comments_count}
        </span>
    )

}