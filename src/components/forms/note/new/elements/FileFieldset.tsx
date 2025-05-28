import { clsx } from "clsx";
import { CreateNoteFormData } from "@/core";
import { IconNotes } from "@tabler/icons-react";
import { useFormContext } from "react-hook-form";
import { useRef, useState } from "react";

interface FieldsetProps extends React.FieldsetHTMLAttributes<HTMLFieldSetElement> {
    name: keyof CreateNoteFormData;
}

export const FileFieldset = ({ name, children: legend, ...rest }: FieldsetProps) => {

    const { setValue } = useFormContext<CreateNoteFormData>();

    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [dragging, setDragging] = useState<boolean>(false);

    const processFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setValue(name, reader.result as string, {
                shouldValidate: true,
                shouldDirty: true,
            })
        }
        reader.readAsText(file, "UTF-8");
        setFile(file);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
    }

    const handleDrop = (e: React.DragEvent<HTMLFieldSetElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type === "text/plain") processFile(file);
    }

    const handleDragEnter = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        setDragging(true);
    }

    const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        const to = e.relatedTarget as Node | null;
        if (to && e.currentTarget.contains(to)) return;
        setDragging(false);
    }

    const handleDragOver = (e: React.DragEvent<HTMLFieldSetElement>) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const onLabelKeyDown = (e: React.KeyboardEvent<HTMLLabelElement>) => {
        if (inputRef.current && e.key === "Enter") {
            e.preventDefault();
            inputRef.current.click();
        }
    }

    return (
        <fieldset
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={clsx(
                'w-full h-full pb-3 rounded',
                'border-2 border-dashed dark:border-middark border-midlight',
                'flex items-center justify-center',
                '[&:has(input:hover)]:dark:secondary/50 [&:has(input:hover)]:border-primary/50',
                '[&:has(input:focus)]:dark:secondary/50 [&:has(input:focus)]:border-primary/50',
                'transition-colors duration-300',
                dragging && 'dark:border-secondary/25 border-primary/25',
                file && 'dark:border-secondary border-primary'
            )}
            {...rest}
        >
            {legend}
            <input
                ref={inputRef}
                id={name}
                type="file"
                accept="text/plain"
                onChange={handleFileChange}
                className="hidden"
            />
            <label
                tabIndex={0}
                htmlFor={name}
                onKeyDown={onLabelKeyDown}
                onMouseDown={(e: React.MouseEvent<HTMLLabelElement>) => e.preventDefault()}
                className={clsx(
                    'outline-none cursor-pointer',
                    'rounded p-2',
                    'font-semibold text-center dark:text-middark text-midlight',
                    'dark:hover:text-secondary/50 hover:text-primary/50',
                    'dark:focus-visible:text-secondary/50 focus-visible:text-primary/50',
                    'transition-color duration-300',
                    dragging && 'dark:text-secondary/25 text-primary/25',
                    file && 'dark:text-secondary text-primary'
                )}
            >
                <IconNotes size={44} className="mx-auto" />
                {file ? file.name : ".txt"}
            </label>
        </fieldset >
    )

}