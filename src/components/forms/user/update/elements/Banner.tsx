import { Component, CropperRef } from "@/components";
import { EditUserFormData, User } from "@/core";
import { Header } from "./Header";
import { IconArrowLeft } from "@tabler/icons-react";
import { Template } from "@/components/templates";
import { Upload } from "./Upload";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
    user: User;
    onModalOpen: () => void;
    onModalClose: () => void;
}

export const Banner = ({ user, onModalOpen, onModalClose, ...rest }: BannerProps) => {

    const { setValue } = useFormContext<EditUserFormData>();

    const triggerRef = useRef<HTMLInputElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const applyRef = useRef<HTMLButtonElement>(null);
    const cropperRef = useRef<CropperRef>(null);

    const [url, setUrl] = useState<string>(user.banner);
    const [preview, setPreview] = useState<string>();

    useEffect(() => { setValue("banner", user.banner) }, [setValue, user.banner])

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
            return setValue('banner', croppedImg);
        }
    }, [setValue])

    return (
        <>
            <div className="select-none relative" {...rest}>
                <Component.Banner src={url} user={user} />
                <Upload ref={triggerRef} name="banner" handleFileChange={handleFileChange} isBlocked={user.blocked} />
                {rest.children}
            </div>
            <Template.Modal
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
                {preview && <Component.Cropper ref={cropperRef} imgSrc={preview} aspect={3 / 1} shape="rect" />}
            </Template.Modal>
        </>
    )

}