import { Element } from "./elements";
import { IconCheck, IconDotsVertical, IconEdit, IconTrash, IconX } from "@tabler/icons-react";
import { Menu, MenuItem } from "@/components/menu";
import { Note } from "@/core"
import { useEffect, useState } from "react";

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
    note: Note;
    author: string;
    currentUser: string | null;
}

export const Form = ({ note, author, currentUser, ...rest }: FormProps) => {

    const isAuthor = author === currentUser;

    const initialText = note.markdown ?? "";

    const [text, setText] = useState<string>(initialText);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isPreviewing, setIsPreviewing] = useState<boolean>(true);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

    const scrollToEnd = () => {
        const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        return window.scrollTo({ top: scrollHeight, behavior: 'smooth' });
    }

    const toggleMenu = () => setIsMenuOpen(prev => !prev);

    const closeMenu = () => setIsMenuOpen(false);

    const togglePreview = () => setIsPreviewing(prev => !prev);

    const startEdit = (e: React.MouseEvent) => {
        e.stopPropagation();
        scrollToEnd();
        setIsEditing(true);
        setIsPreviewing(false);
        return;
    }

    const startSubmit = (e: React.MouseEvent) => {
        e.stopPropagation();
        scrollToEnd();
        setIsSubmiting(true);
        return;
    }

    const startDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        scrollToEnd();
        toggleMenu();
        setIsDeleting(true);
        return;
    }

    const cancelEdit = () => {
        setText(initialText);
        setIsEditing(false);
        setIsPreviewing(true);
        return;
    }

    useEffect(() => { scrollToEnd() }, []);

    const { Title, EditingTitle, ActionButton, Text, Dialog } = Element;

    return (
        <form {...rest} className="relative flex flex-col flex-1">
            <header className="px-4 inmd:px-2 flex items-center justify-between gap-3 border-b dark:border-middark border-midlight">
                <div className="insm:overflow-hidden w-fit flex gap-3">
                    <Title
                        disabled={isPreviewing}
                        onClick={togglePreview}
                        isPreviewing={isPreviewing}
                    >
                        {note.title}
                    </Title>
                    <EditingTitle
                        disabled={!isPreviewing}
                        onClick={togglePreview}
                        isPreviewing={isPreviewing}
                        isEditing={isEditing}
                    >
                        Editando
                    </EditingTitle>
                </div>
                {isAuthor &&
                    <div className="flex gap-3">
                        <ActionButton
                            type="button"
                            onClick={cancelEdit}
                            isEditing={isEditing}
                            icon={IconX}
                            tooltip="Cancelar"
                            className="dark:bg-semilight/20 bg-semidark/20 dark:hover:bg-semilight/10 hover:bg-semidark/10"
                        />
                        <ActionButton
                            type="button"
                            onClick={startSubmit}
                            isEditing={isEditing}
                            icon={IconCheck}
                            tooltip="Salvar"
                            className="text-white bg-primary hover:bg-secondary"
                        />
                        <ActionButton
                            type="button"
                            onClick={toggleMenu}
                            onBlur={closeMenu}
                            isEditing={!isEditing}
                            icon={IconDotsVertical}
                            tooltip="Menu"
                            className="relative dark:hover:bg-semilight/10 hover:bg-semidark/10 dark:focus:bg-semilight/10 focus:bg-semidark/10"
                        >
                            <Menu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen}>
                                <MenuItem
                                    onClick={startEdit}
                                    icon={IconEdit}
                                    className="dark:hover:text-secondary hover:text-primary"
                                >
                                    Editar
                                </MenuItem>
                                <MenuItem
                                    onClick={startDelete}
                                    icon={IconTrash}
                                    className="hover:text-red-500"
                                >
                                    Apagar
                                </MenuItem>
                            </Menu>
                        </ActionButton>
                    </div>
                }
            </header>
            <Text
                readOnly={isPreviewing}
                setText={setText}
                value={isPreviewing ? initialText : text}
            />
            <Dialog
                msg="Tem certeza de que deseja apagar esta nota?"
                desc="Esta ação é irreversível e todos os dados serão perdidos permanentemente."
                opt="Sim, apagar"
                type="button"
                isOpen={isDeleting}
                setIsOpen={setIsDeleting}
                className="dark:text-red-500 text-red-600 dark:hover:bg-red-500 hover:bg-red-600"
            />

            <Dialog
                msg="Tem certeza de que deseja atualizar esta nota?"
                desc="A atualização sobrescreverá o conteúdo atual. Não é possível desfazer esta operação."
                opt="Sim, atualizar"
                type="button"
                isOpen={isSubmiting}
                setIsOpen={setIsSubmiting}
                className="dark:text-secondary text-primary hover:bg-primary"
            />
        </form>
    )

}