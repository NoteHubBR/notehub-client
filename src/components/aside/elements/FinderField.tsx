import { Button } from "./Button";
import { Field } from "./Field";
import { IconNotes } from "@tabler/icons-react";
import { Note } from "./Note";

export const FinderField = () => {
    return (
        <div>
            <Field className="flex flex-col gap-3 py-1 px-2 hover:none">
                <div className="flex items-center justify-between">
                    <span className="text-md">Nota</span>
                    <Button
                        icon={<IconNotes size={20} />}
                        text="Nova"
                        strong
                        className="
                            py-1 px-2
                            flex items-center gap-1   
                            bg-violet-500/50 hover:bg-violet-500 
                            rounded-md
                            transition-colors
                        "
                    />
                </div>
                <input
                    type="text"
                    className="
                        outline-none
                        w-full py-1 px-2
                        text-sm text-violet-500 font-semibold
                        border-2 dark:border-violet-600/40 border-violet-600/40 rounded-md
                        dark:focus:border-violet-600 dark:valid:border-violet-600
                        dark:bg-neutral-900 bg-neutral-100
                        focus:border-violet-600 valid:border-violet-600
                    "
                    required
                />
                <Field>
                    <Note avatar="/imgs/avatar.png" username="lucas-adm" title="Vasco da Gama" />
                </Field>
                <div className="w-fit flex items-center gap-3 py-1 cursor-pointer">
                    <span className="text-center text-sm hover:text-violet-500 transition-colors">Mostrar mais</span>
                </div>
            </Field>
        </div>
    )
}