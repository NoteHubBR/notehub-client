import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import { clsx } from "clsx";
import { editUserFormSchema } from "@/core";
import { IconCameraPlus, IconForbid } from "@tabler/icons-react";

interface UploadProps extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof typeof editUserFormSchema.shape;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isBlocked: boolean;
}

export const Upload = forwardRef<HTMLInputElement, UploadProps>(({ name, handleFileChange, isBlocked, className, ...rest }, ref) => {

    return (
        <>
            <input
                disabled={isBlocked}
                aria-label="Carregar"
                id={name}
                ref={ref}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                {...rest}
            />
            <label
                htmlFor={name}
                className={clsx(
                    'cursor-pointer',
                    'rounded-full p-2',
                    'backdrop-blur-[2px]',
                    'bg-alpha-d-md',
                    'hover:bg-alpha-d-sm transition-all',
                    className
                )}
            >
                {isBlocked ? <IconForbid color="white" /> : <IconCameraPlus color="white" />}
            </label>
        </>
    )

})

Upload.displayName = 'Upload';