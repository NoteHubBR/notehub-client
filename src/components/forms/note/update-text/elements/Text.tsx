import { clsx } from 'clsx';
import { NoteTextUpdateFormData, renderMarkdown } from "@/core";
import { useEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";

interface TextProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    isEditing: boolean;
    isPreviewing: boolean;
    setText: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

export const Text = ({ isEditing, isPreviewing, setText, value, ...rest }: TextProps) => {

    const { setValue } = useFormContext<NoteTextUpdateFormData>();

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const historyRef = useRef<string[]>([value]);
    const historyIndexRef = useRef<number>(0);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const MAX_HISTORY = 100;

    const pushHistory = (newValue: string) => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
            historyRef.current.push(newValue);
            if (historyRef.current.length > MAX_HISTORY) {
                historyRef.current = historyRef.current.slice(-MAX_HISTORY);
                historyIndexRef.current = historyRef.current.length - 1;
            } else {
                historyIndexRef.current = historyRef.current.length - 1;
            }
        }, 500);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue("markdown", newValue);
        setText(newValue);
        pushHistory(newValue);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'z' && (e.ctrlKey || e.metaKey) && !e.shiftKey) {
            e.preventDefault();
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
                debounceRef.current = null;
            }
            if (historyIndexRef.current > 0) {
                historyIndexRef.current -= 1;
                const prev = historyRef.current[historyIndexRef.current];
                setValue("markdown", prev);
                setText(prev);
            }
            return;
        }
        if (
            (e.key === 'y' && (e.ctrlKey || e.metaKey)) ||
            (e.key === 'z' && (e.ctrlKey || e.metaKey) && e.shiftKey)
        ) {
            e.preventDefault();
            if (historyIndexRef.current < historyRef.current.length - 1) {
                historyIndexRef.current += 1;
                const next = historyRef.current[historyIndexRef.current];
                setValue("markdown", next);
                setText(next);
            }
            return;
        }
        if (e.key === "Tab") {
            e.preventDefault();
            if (textareaRef.current) {
                const { selectionStart, selectionEnd } = textareaRef.current;
                const newValue = `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`;
                setValue("markdown", newValue);
                setText(newValue);
                pushHistory(newValue);
                setTimeout(() => {
                    if (textareaRef.current) {
                        const newPos = selectionStart + 1;
                        textareaRef.current.selectionStart = newPos;
                        textareaRef.current.selectionEnd = newPos;
                    }
                }, 0)
            }
        }
    }

    useEffect(() => {
        if (textareaRef.current) {
            const len = textareaRef.current.value.length;
            textareaRef.current.selectionStart = len;
            textareaRef.current.selectionEnd = len;
        }
    }, [])

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        }
    }, [])

    return (
        <textarea
            ref={textareaRef}
            id="markdown"
            name="markdown"
            spellCheck={false}
            autoCorrect="off"
            autoCapitalize="off"
            autoFocus
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={clsx(
                'resize-none outline-none',
                'overscroll-contain inmd:overscroll-auto',
                'scrollbar-desktop inmd:scrollbar-mobile',
                !isEditing || isPreviewing ? 'hidden' : 'block',
                'p-4 flex-1',
                'bg-transparent'
            )}
            {...rest}
        />
    )

}