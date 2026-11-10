import { useEffect } from "react";

interface ShortcutsProps {
    ref: React.RefObject<HTMLElement | null>;
    isAuthor: boolean;
    isEditing: boolean;
    onFullscreen: () => void;
    onPictureInPicture: () => void;
    onStartDecryption: () => void;
    onStartEdit: () => void;
    onCancel: () => void;
    onDelete: () => void;
    onSave: () => void;
}

export const useShortcuts = ({ ref, isAuthor, isEditing, onFullscreen, onPictureInPicture, onStartDecryption, onStartEdit, onCancel, onDelete, onSave }: ShortcutsProps) => {

    const scrollToNote = () => {
        const noteEl = document.getElementById('note');
        if (noteEl) return noteEl.scrollIntoView({ behavior: "smooth" });
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (isEditing) e.preventDefault();
    }

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
        const isCtrl = e.ctrlKey || e.metaKey;
        const isAlt = e.altKey;
        if (isCtrl && isAlt) switch (e.code) {
            case "KeyC": e.preventDefault(); scrollToNote(); break;
            default: break;
        }
        if (!isCtrl && isAlt) switch (e.key.toLowerCase()) {
            case "z": e.preventDefault(); onFullscreen(); break;
            case "x": e.preventDefault(); onPictureInPicture(); break;
            case "c":
                if (!isEditing) { e.preventDefault(); onStartDecryption(); } break;
            default: break;
        }
        return;
    }

    const handleAuthorKeyDown = (e: KeyboardEvent) => {
        if (!isAuthor) return;
        const isCtrl = e.ctrlKey || e.metaKey;
        const isAlt = e.altKey;
        if (isCtrl && isAlt) return;
        if (isCtrl && !isAlt) switch (e.key.toLowerCase()) {
            case "e":
                if (!isEditing) { e.preventDefault(); onStartEdit(); } break;
            case "q":
                if (isEditing) { e.preventDefault(); onCancel(); } break;
            case "d":
                if (!isEditing) { e.preventDefault(); onDelete(); } break;
            case "s":
                if (isEditing) { e.preventDefault(); onSave(); } break;
            default: break;
        }
        return;
    }

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isEditing])

    useEffect(() => {
        const doc = ref.current ? ref.current.ownerDocument : document;
        doc.addEventListener("keydown", handleGlobalKeyDown);
        doc.addEventListener("keydown", handleAuthorKeyDown);
        return () => {
            doc.removeEventListener("keydown", handleGlobalKeyDown);
            doc.removeEventListener("keydown", handleAuthorKeyDown);
        }
    }, [isAuthor, isEditing, onStartEdit, onSave, onCancel, onDelete])

}