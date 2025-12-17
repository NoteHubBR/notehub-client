import { Component, CropperRef } from "@/components";
import { EditUserFormData, User } from "@/core";
import { Header } from "./Header";
import { IconArrowLeft } from "@tabler/icons-react";
import { Removal } from "./Removal";
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

    const { setValue, setError } = useFormContext<EditUserFormData>();

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
            setError('banner', {});
            const preview = URL.createObjectURL(file);
            setPreview(preview);
        }
        if (triggerRef.current) triggerRef.current.value = '';
    }, [setError])

    const handleApplyClick = useCallback(async (): Promise<string | void> => {
        if (!triggerRef.current || !cropperRef.current) return;
        const croppedImg = await cropperRef.current.getCroppedImage();
        if (croppedImg) {
            setUrl(croppedImg);
            return setValue('banner', croppedImg);
        }
    }, [setValue])

    const handleRemovalClick = (): void => {
        setUrl('/imgs/banner.png');
        setValue('banner', null);
        setError('banner', {});
        return;
    }

    return (
        <>
            <div className="select-none relative" {...rest}>
                <Component.Banner src={url} user={user} />
                <div className="center flex items-center gap-3">
                    <Upload
                        ref={triggerRef}
                        user={user}
                        name="banner"
                        handleFileChange={handleFileChange}
                        isBlocked={user.blocked}
                    />
                    <Removal
                        name="removal"
                        handleRemovalClick={handleRemovalClick}
                        isBlocked={user.blocked}
                        currentImg={url}
                    />
                </div>
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