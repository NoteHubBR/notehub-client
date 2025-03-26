import { Cropper, CropperRef } from "@/components/Cropper";
import { EditUserFormData, User } from "@/core";
import { Header } from "./Header";
import { IconArrowLeft } from "@tabler/icons-react";
import { Modal } from "@/components/template/Modal";
import { Photo } from "@/components/Photo";
import { Upload } from "./Upload";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useScreen } from "@/data/hooks";

interface AvatarProps extends React.HTMLAttributes<HTMLImageElement> {
    user: User;
    onModalOpen: () => void;
    onModalClose: () => void;
}

export const Avatar = ({ user, onModalOpen, onModalClose, ...props }: AvatarProps) => {

    const { onDesktop } = useScreen();

    const { setValue } = useFormContext<EditUserFormData>();

    const triggerRef = useRef<HTMLInputElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const applyRef = useRef<HTMLButtonElement>(null);
    const cropperRef = useRef<CropperRef>(null);

    const [url, setUrl] = useState<string>(user.avatar);
    const [preview, setPreview] = useState<string>();

    useEffect(() => { setValue("avatar", user.avatar) }, [setValue, user.avatar])

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
        const file = e.target.files?.[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setPreview(preview);
        }
        if (triggerRef.current) triggerRef.current.value = '';
    }, [])

    const handleApplyClick = useCallback(async (): Promise<string | void> => {
        if (!triggerRef.current || !cropperRef.current) return;
        const croppedImg = await cropperRef.current.getCroppedImage();
        if (croppedImg) {
            setUrl(croppedImg);
            return setValue('avatar', croppedImg);
        }
    }, [setValue])

    return (
        <>
            <div className="select-none bot-mid left-4">
                <Photo
                    src={url} user={user} size={onDesktop ? 111 : 88}
                    className="border-4 dark:border-darker border-lighter" {...props}
                />
                <Upload ref={triggerRef} name="avatar" handleFileChange={handleFileChange} />
            </div>
            <Modal
                triggerRef={triggerRef}
                closeRef={closeRef}
                applyRef={applyRef}
                onOpen={onModalOpen}
                onClose={onModalClose}
            >
                <Header
                    ref={closeRef}
                    applyRef={applyRef}
                    aria-label="Aplicar"
                    type="button"
                    icon={<IconArrowLeft size={20} />}
                    title="Editar mídia"
                    onClick={handleApplyClick}
                >
                    Aplicar
                </Header>
                {preview && <Cropper ref={cropperRef} imgSrc={preview} aspect={1 / 1} shape="round" />}
            </Modal>
        </>
    )

}