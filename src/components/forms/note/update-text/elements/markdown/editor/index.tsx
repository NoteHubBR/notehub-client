import { clsx } from 'clsx';
import { NoteTextUpdateFormData } from '@/core';
import { useDebouncedCallback, usePref } from '@/data/hooks';
import { useEditor } from './hook';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface MdEditorProps {
    isEditing: boolean;
    isPreviewing: boolean;
    onDraftChange: (value: string) => void;
    setText: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

export const MdEditor = ({ isEditing, isPreviewing, onDraftChange, setText, value }: MdEditorProps) => {

    const { setValue } = useFormContext<NoteTextUpdateFormData>();
    const { pref } = usePref();

    const editorRef = useRef<HTMLDivElement>(null);

    const debouncedDraftChange = useDebouncedCallback((newValue: string) => {
        onDraftChange(newValue);
    }, 800);

    const handleChange = (newValue: string) => {
        setText(newValue);
        setValue('markdown', newValue);
        debouncedDraftChange(newValue);
    }

    const viewRef = useEditor({
        parentRef: editorRef,
        value,
        isDark: pref.useDarkTheme,
        onChange: handleChange,
    })

    useEffect(() => {
        if (!viewRef.current) return;
        if (isEditing && !isPreviewing) {
            requestAnimationFrame(() => {
                if (viewRef.current) viewRef.current.focus();
            })
        }
    }, [isEditing, isPreviewing])

    return (
        <div
            ref={editorRef}
            className={clsx(
                'cm-root',
                'overscroll-contain inmd:overscroll-auto',
                'overflow-y-auto',
                'scrollbar-desktop inmd:scrollbar-mobile',
                !isEditing || isPreviewing ? 'hidden' : 'block'
            )}
        />
    )

}