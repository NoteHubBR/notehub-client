import { Comment, Note, Token, User } from "@/core";
import { Element } from "./elements";
import { Form } from "@/components/forms";
import { IconListTree } from "@tabler/icons-react";
import { Menu, MenuItem } from "@/components/menu";
import { useState } from "react";

interface CommentsProps extends React.HTMLAttributes<HTMLElement> {
    token: Token | null;
    user: User | null;
    note: Note;
    setNote: React.Dispatch<React.SetStateAction<Note | null>>;
}

export const Comments = ({ token, user, note, setNote, ...rest }: CommentsProps) => {

    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [comments, setComments] = useState<Comment[]>([] as Comment[]);

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
            {token && user ?
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
                <p key={comment.id}>{comment.text}</p>
            ))}
        </section>
    )

}