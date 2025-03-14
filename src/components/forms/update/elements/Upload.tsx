import { ChangeEvent, forwardRef, InputHTMLAttributes } from "react";
import { editUserFormSchema } from "@/core";
import { IconCameraPlus } from "@tabler/icons-react";

interface UploadProps extends InputHTMLAttributes<HTMLInputElement> {
    name: keyof typeof editUserFormSchema.shape;
    handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Upload = forwardRef<HTMLInputElement, UploadProps>(({ name, handleFileChange, ...rest }, ref) => {

    return (
        <>
            <input
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
                bg-[rgba(0,0,0,.5)]
                hover:bg-[rgba(0,0,0,.25)] transition-all "
            >
                <IconCameraPlus color="white" />
            </label>
        </>
    )

})

Upload.displayName = 'Upload';