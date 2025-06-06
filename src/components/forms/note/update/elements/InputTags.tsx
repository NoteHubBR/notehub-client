import { clsx } from "clsx";
import { Count } from "./Count";
import { Element } from ".";
import { noteUpdateFormSchema } from "@/core";
import { useEffect, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { useTags } from "@/data/hooks";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    name: keyof typeof noteUpdateFormSchema.shape;
    noteTags: string[];
}

export const InputTags = ({ name, noteTags, ...rest }: InputProps) => {

    const { tags } = useTags();

    const { setValue, formState: { errors } } = useFormContext();
    const hasError = errors[name];

    const value: string = useWatch({ name, defaultValue: rest.defaultValue ?? "" });

    const [input, setInput] = useState<string>("");
    const [selectedTags, setSelectedTags] = useState<string[]>(noteTags);

    const filteredTags = input.length > 0
        ? tags.filter((tag) => tag.toLowerCase().includes(input.toLowerCase()))
        : [] as string[];

    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.endsWith(" ")) {
            const tag = val.trim();
            if (tag !== "" && !selectedTags.includes(tag)) {
                setSelectedTags((prev) => [...prev, tag]);
            }
            setInput("");
        }
        else setInput(val);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace" && input === "" && selectedTags.length > 0) {
            setSelectedTags((prev) => prev.slice(0, -1));
        }
    }

    const handleBlur = () => {
        const val = input.trim();
        if (val !== "" && !selectedTags.includes(val)) {
            setSelectedTags((prev) => [...prev, val]);
        }
        setInput("");
    };

    useEffect(() => {
        setValue(name, selectedTags, {
            shouldValidate: true,
            shouldTouch: true
        });
    }, [name, selectedTags, setValue]);

    const { Tag, TagsList, TagsListItem } = Element;

    return (
        <>
            <div
                onClick={() => {
                    if (inputRef.current) return inputRef.current.focus();
                }}
                className={clsx(
                    "peer cursor-text overflow-auto scrollbar-mobile",
                    "w-full max-h-[111px] my-2 p-2 rounded-md",
                    "flex items-center gap-2 flex-wrap",
                    "border dark:border-middark border-midlight",
                    "dark:focus-within:border-secondary focus-within:border-primary",
                    "transition-colors",
                    hasError
                        ? "dark:!border-red-500 !border-red-600"
                        : "dark:peer-focus-within:border-primary peer-focus-within:border-primary"
                )}
            >
                {selectedTags.length > 0
                    ? selectedTags.map((tag, key) => (
                        <Tag
                            key={key}
                            tags={selectedTags}
                            tag={tag}
                            setSelectedTags={setSelectedTags}
                        />
                    ))
                    : null}
                <input
                    ref={inputRef}
                    id={name}
                    maxLength={20}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    type="text"
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    value={input}
                    className={clsx(
                        "w-[150px] ",
                        "text-sm",
                        "bg-transparent",
                        hasError
                            ? "!font-medium dark:text-red-500 text-red-600 dark:selection:bg-red-500 selection:!bg-red-600"
                            : "dark:text-white text-black selection:!bg-primary"
                    )}
                    {...rest}
                />
            </div>
            <Count
                current={value.length}
                max={12}
                className={clsx(hasError && "dark:text-red-500 text-red-600")}
            />
            <TagsList filteredTags={filteredTags}>
                {filteredTags.map((tag, key) => (
                    <TagsListItem
                        key={key}
                        tag={tag}
                        selectedTags={selectedTags}
                        setSelectedTags={setSelectedTags}
                        setInput={setInput}
                    />
                ))}
            </TagsList>
        </>
    )

}