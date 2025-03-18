import { Area } from "react-easy-crop";
import { ChangeEvent, forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { getCroppedImg } from "@/core";
import { usePref } from "@/data/hooks";
import EasyCropper from "react-easy-crop";

interface CropperProps {
    imgSrc: string;
    aspect: number;
    shape: "rect" | "round";
}

export interface CropperRef {
    getCroppedImage: () => Promise<string | void>;
}

const CropperComponent = ({ imgSrc, aspect, shape }: CropperProps, ref: React.Ref<CropperRef>) => {

    const { pref: { useDarkTheme } } = usePref();

    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

    const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleRangeChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setZoom(Number(e.target.value));
    }, []);

    const onCrop = useCallback(async (): Promise<string | void> => {
        if (!imgSrc || !croppedAreaPixels) return;
        return await getCroppedImg(imgSrc, croppedAreaPixels);
    }, [croppedAreaPixels, imgSrc]);

    useImperativeHandle(ref, () => ({
        getCroppedImage: onCrop
    }));

    const percentage = ((zoom - 1) / (3 - 1)) * 100;
    const rangeStyle = useDarkTheme
        ?
        { background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${percentage}%, #2e1065 ${percentage}%, #2e1065 100%)` }
        :
        { background: `linear-gradient(to right, #7c3aed 0%, #7c3aed ${percentage}%, #ddd6fe ${percentage}%, #ddd6fe 100%)` }

    return (
        <>
            <main className="w-full h-full dark:bg-neutral-800 bg-neutral-200">
                <div className="relative w-[90%] h-full m-auto">
                    <EasyCropper
                        objectFit="horizontal-cover"
                        showGrid={false}
                        crop={crop}
                        image={imgSrc}
                        aspect={aspect}
                        cropShape={shape}
                        zoom={zoom}
                        zoomSpeed={0.5}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        classes={{
                            containerClassName: '!overflow-visible dark:!bg-neutral-800 !bg-neutral-200',
                            cropAreaClassName: '!border-4 !border-violet-500 dark:!text-[rgba(0,0,0,.5)] !text-[rgba(255,255,255,.5)]',
                        }}
                    />
                </div>
            </main>
            <footer className="sticky bottom-0 w-full h-[52px] flex justify-center items-center dark:bg-black bg-white">
                <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={handleRangeChange}
                    style={rangeStyle}
                    className="w-3/5 h-[3px] rounded-full"
                />
            </footer>
        </>
    )

}

export const Cropper = forwardRef<CropperRef, CropperProps>(CropperComponent);

Cropper.displayName = 'Cropper';