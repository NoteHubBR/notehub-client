import { clsx } from 'clsx';
import { NoteTextUpdateFormData } from '@/core';
import { useEditor } from './hook';
import { useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import { usePref } from '@/data/hooks';

interface MdEditorProps {
    isEditing: boolean;
    isPreviewing: boolean;
    setText: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

export const MdEditor = ({ isEditing, isPreviewing, setText, value }: MdEditorProps) => {

    const { setValue } = useFormContext<NoteTextUpdateFormData>();
    const { pref } = usePref();

    const editorRef = useRef<HTMLDivElement>(null);

    const handleChange = (newValue: string) => {
        setText(newValue);
        setValue('markdown', newValue)
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