import { Banner as GlobalBanner } from "@/components/Banner";
import { getCroppedImg, User } from "@/core";
import { Header } from "./Header";
import { IconArrowLeft, IconCameraPlus, IconZoomIn, IconZoomOut } from "@tabler/icons-react";
import { Modal } from "@/components/template/Modal";
import { useCallback, useRef, useState } from "react";
import Cropper, { Area } from "react-easy-crop";

interface BannerProps extends React.HTMLAttributes<HTMLImageElement> {
    user: User;
    children: React.ReactNode;
}

export const Banner = ({ user, children, ...props }: BannerProps) => {

    const triggerRef = useRef<HTMLInputElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const applyRef = useRef<HTMLButtonElement>(null);

    const [url, setUrl] = useState<string>(user.banner);
    const [preview, setPreview] = useState<string>();
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const preview = URL.createObjectURL(file);
            setPreview(preview);
        }
        if (triggerRef.current) triggerRef.current.value = '';
    }, [])

    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleApplyClick = useCallback(async () => {
        if (!preview || !croppedAreaPixels) return;
        try {
            const croppedImage = await getCroppedImg(
                preview,
                croppedAreaPixels,
            );
            setUrl(croppedImage);
            setZoom(1);
        } catch (e) {
            console.error('Erro ao recortar imagem', e);
        }
    }, [croppedAreaPixels, preview]);

    return (
        <>
            <div className="select-none relative">
                <GlobalBanner src={url} user={user} {...props} />
                <input ref={triggerRef} id="banner" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                <label
                    htmlFor="banner"
                    className="cursor-pointer center
                    rounded-full p-2
                    backdrop-blur-[2px]
                    bg-[rgba(0,0,0,.5)]
                    hover:bg-[rgba(0,0,0,.25)] transition-all "
                >
                    <IconCameraPlus color="white" />
                </label>
                {children}
            </div>
            <Modal triggerRef={triggerRef} closeRef={closeRef} applyRef={applyRef}>
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
                <main className="w-full h-full bg-neutral-100 dark:bg-neutral-900">
                    {preview && (
                        <Cropper
                            image={preview}
                            crop={crop}
                            zoom={zoom}
                            aspect={3 / 1}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                            classes={{
                                mediaClassName: "object-contain",
                            }}
                        />
                    )}
                </main>
                <footer className="w-full h-[52px] sticky bottom-0 dark:bg-black bg-white flex items-center justify-center gap-4 px-4">
                    <IconZoomOut size={20} className="!text-neutral-500" />
                    <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.1"
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className="cursor-pointer appearance-none w-1/2 rounded-full dark:bg-neutral-100 bg-neutral-100"
                    />
                    <IconZoomIn size={20} className="!text-neutral-500" />
                </footer>
            </Modal>
        </>
    )

}