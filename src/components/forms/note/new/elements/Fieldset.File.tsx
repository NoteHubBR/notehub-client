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

    const ALLOWED_FILENAMES = new Set([
        "Dockerfile",
        "Makefile",
        "CMakeLists.txt",
        ".env",
        ".gitignore",
        ".gitattributes",
        ".dockerignore",
    ])

    const ALLOWED_EXTENSIONS = new Set([
        "txt",
        "md",
        "markdown",
        "rst",
        "csv",
        "tsv",
        "json",
        "xml",
        "yaml",
        "yml",
        "toml",
        "ini",
        "conf",
        "config",
        "properties",
        "log",
        "rtf",
        "sql",
        "java",
        "kt",
        "groovy",
        "js",
        "jsx",
        "ts",
        "tsx",
        "py",
        "rb",
        "php",
        "go",
        "rs",
        "c",
        "cpp",
        "h",
        "hpp",
        "cs",
        "swift",
        "scala",
        "lua",
        "sh",
        "bash",
        "zsh",
        "bat",
        "cmd",
        "ps1",
        "html",
        "htm",
        "css",
        "scss",
        "less",
        "vue",
        "svelte",
        "tex",
    ])

    const isAllowedTextFile = (file: File) => {
        const fileName = file.name;
        const lowerName = fileName.toLowerCase();
        if (ALLOWED_FILENAMES.has(fileName) || ALLOWED_FILENAMES.has(lowerName)) return true;
        const extension = fileName.includes(".") ? fileName.split(".").pop()?.toLowerCase() : "";
        if (extension && ALLOWED_EXTENSIONS.has(extension)) return true;
        return (
            file.type.startsWith("text/") ||
            file.type === "application/json" ||
            file.type === "application/xml" ||
            file.type === "application/sql"
        )
    }

    const processFile = (file: File) => {
        if (!isAllowedTextFile(file)) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result !== "string") return;
            setValue(name, result, {
                shouldValidate: true,
                shouldDirty: true,
            })
            setFile(file);
        }
        return reader.readAsText(file, "UTF-8");
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) processFile(file);
        return e.target.value = '';
    }

    const handleDrop = (e: React.DragEvent<HTMLFieldSetElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) processFile(file);
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
        if (!inputRef.current) return;
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current.click();
        }
    }

    const onLabelMouseDown = (e: React.MouseEvent<HTMLLabelElement>) => e.preventDefault();

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
                accept=".txt,.md,.markdown,.rst,.csv,.tsv,.json,.xml,.yaml,.yml,.toml,.ini,.conf,.config,.properties,.env,.log,.rtf,.sql,.java,.kt,.groovy,.js,.jsx,.ts,.tsx,.py,.rb,.php,.go,.rs,.c,.cpp,.h,.hpp,.cs,.swift,.scala,.lua,.sh,.bash,.zsh,.bat,.cmd,.ps1,.html,.htm,.css,.scss,.less,.vue,.svelte,.tex,.gitignore,.gitattributes,.dockerignore,Dockerfile,Makefile,CMakeLists.txt,text/*,application/json,application/xml,application/sql"
                onChange={handleFileChange}
                className="hidden"
            />
            <label
                tabIndex={0}
                htmlFor={name}
                onKeyDown={onLabelKeyDown}
                onMouseDown={onLabelMouseDown}
                className={clsx(
                    'outline-none cursor-pointer',
                    'rounded p-2',
                    'font-semibold text-center dark:text-middark text-midlight',
                    'dark:hover:text-secondary/50 hover:text-primary/50',
                    'dark:focus-visible:text-secondary/50 focus-visible:text-primary/50',
                    'transition-colors duration-300',
                    dragging && 'dark:text-secondary/25 text-primary/25',
                    file && 'dark:text-secondary text-primary'
                )}
            >
                <IconNotes size={44} className="mx-auto" />
                {file ? file.name : "Arquivo"}
            </label>
        </fieldset>
    )

}