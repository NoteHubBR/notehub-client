import { Comment, Note, Page, Token, User } from "@/core";
import { Element } from "./elements";
import { Form } from "@/components/forms";
import { Icon } from "@/components/icons";
import { IconListTree } from "@tabler/icons-react";
import { Menu, MenuItem } from "@/components/menu";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useServices } from "@/data/hooks";

interface CommentsProps extends React.HTMLAttributes<HTMLElement> {
    token: Token | null;
    user: User | null;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const Comments = ({ token, user, note, setNote, ...rest }: CommentsProps) => {

    const { commentService: { getComments } } = useServices();

    const isFetching = useRef<boolean>(false);
    const [hasFetched, setHasFetched] = useState<boolean>(false);
    const [page, setPage] = useState<Omit<Page<Comment>, 'content'>>({} as Omit<Page<Comment>, 'content'>);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const [isPending, startTransition] = useTransition();

    const init = useCallback(async () => {
        if (isFetching.current || hasFetched) return;
        startTransition(async () => {
            try {
                isFetching.current = true;
                const { content, ...rest } = await getComments(note.id, 'page=0');
                setPage(rest)
                setComments(content);
            } catch (error) {
                throw error
            } finally {
                isFetching.current = false;
                setHasFetched(true);
            }
        })
    }, [getComments, hasFetched, note.id])

    const handleScroll = useCallback(async () => {
        if (isFetching.current || page.last) return;
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        startTransition(async () => {
            if (scrollTop + clientHeight >= scrollHeight) {
                try {
                    isFetching.current = true;
                    const { content, ...rest } = await getComments(note.id, `page=${page.page + 1}`);
                    setPage(rest);
                    setComments(prev => [...prev, ...content]);
                } catch (error) {
                    throw error;
                } finally {
                    isFetching.current = false;
                    setHasFetched(true);
                }
            }
        })
    }, [getComments, note.id, page.last, page.page])

    useEffect(() => {
        init();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll, hasFetched, init])

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    const { Title, Sorter, Dialog } = Element;

    return (
        <section
            className="w-[72.5%] inlg:w-full inmd:px-2 py-2"
            {...rest}
        >
            <header className="p-2 flex items-center insm:justify-center gap-3">
                <Title count={note.comments_count} />
                <Sorter
                    onClick={toggleMenu}
                    onBlur={closeMenu}
                    icon={IconListTree}
                    tooltip="Ordenar"
                    count={note.comments_count}
                >
                    Classificar por
                    <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
                        <MenuItem
                            onClick={() => setIsMenuOpen(false)}
                            className="!font-normal insm:text-xs"
                        >
                            Principais comentários
                        </MenuItem>
                        <MenuItem
                            onClick={() => setIsMenuOpen(false)}
                            className="!font-normal insm:text-xs"
                        >
                            Mais recentes
                        </MenuItem>
                    </Menu>
                </Sorter>
            </header>
            {token && user
                ?
                <Form.Comment.New
                    user={user}
                    token={token}
                    note={note}
                    setComments={setComments}
                    setNote={setNote}
                />
                :
                <Dialog>Para comentar é preciso estar logado.</Dialog>
            }
            {comments.map((comment) => (
                <Form.Comment.Update
                    key={comment.id}
                    user={user}
                    token={token}
                    comment={comment}
                    setComments={setComments}
                    setNote={setNote}
                />
            ))}
            <Icon.Loading hidden={!isPending} size={50} className="py-6" />
        </section>
    )

}