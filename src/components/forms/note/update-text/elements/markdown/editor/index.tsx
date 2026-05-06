import { clsx } from 'clsx';
import { NoteTextUpdateFormData } from '@/core';
import { useEditor } from './hook';
import { useFormContext } from 'react-hook-form';
import { usePref } from '@/data/hooks';
import { useRef } from 'react';

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

    useEditor({
        parentRef: editorRef,
        value,
        isDark: pref.useDarkTheme,
        onChange: handleChange,
    })

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