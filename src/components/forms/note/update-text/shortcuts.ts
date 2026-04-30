import { useEffect } from "react";

interface ShortcutsProps {
    isAuthor: boolean;
    isEditing: boolean;
    onStartEdit: () => void;
    onCancel: () => void;
    onDelete: () => void;
    onSave: () => void;
}

export const useShortcuts = ({ isAuthor, isEditing, onStartEdit, onCancel, onDelete, onSave }: ShortcutsProps) => {

    const scrollToNote = () => {
        const noteEl = document.getElementById('note');
        if (noteEl) return noteEl.scrollIntoView({ behavior: "smooth" });
    }

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
        if (isEditing) e.preventDefault();
    }

    const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (!e.altKey) return;
        switch (e.key.toLowerCase()) {
            case "c": e.preventDefault(); scrollToNote(); break;
        }
    }

    const handleAuthorKeyDown = (e: KeyboardEvent) => {
        if (!isAuthor) return;
        const isCtrl = e.ctrlKey || e.metaKey;
        if (!isCtrl) return;
        switch (e.key.toLowerCase()) {
            case "e":
                if (!isEditing) { e.preventDefault(); onStartEdit(); } break;
            case "q":
                if (isEditing) { e.preventDefault(); onCancel(); } break;
            case "d":
                if (!isEditing) { e.preventDefault(); onDelete(); } break;
            case "s":
                if (isEditing) { e.preventDefault(); onSave(); } break;
        }
    }

    useEffect(() => {
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [isEditing])

    useEffect(() => {
        window.addEventListener("keydown", handleGlobalKeyDown);
        window.addEventListener("keydown", handleAuthorKeyDown);
        return () => {
            window.removeEventListener("keydown", handleGlobalKeyDown);
            window.removeEventListener("keydown", handleAuthorKeyDown);
        }
    }, [isAuthor, isEditing, onStartEdit, onSave, onCancel, onDelete])

}