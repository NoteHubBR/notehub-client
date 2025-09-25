import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import { editUserFormSchema } from "@/core";
import { IconCameraPlus, IconForbid } from "@tabler/icons-react";

interface UploadProps extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof typeof editUserFormSchema.shape;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
    isBlocked: boolean;
}

export const Upload = forwardRef<HTMLInputElement, UploadProps>(({ name, handleFileChange, isBlocked, ...rest }, ref) => {

    return (
        <>
            <input
                disabled={isBlocked}
                aria-label="Zoom"
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
                className="cursor-pointer center
                rounded-full p-2
                backdrop-blur-[2px]
                bg-alpha-d-md
                hover:bg-alpha-d-sm transition-all"
            >
                {isBlocked ? <IconForbid color="white" /> : <IconCameraPlus color="white" />}
            </label>
        </>
    )

})

Upload.displayName = 'Upload';