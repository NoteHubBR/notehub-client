import { clsx } from 'clsx';
import { IconFlame } from '@tabler/icons-react';
import { useCallback, useState } from 'react';

export const Flame = ({ inFlames, ...props }: { inFlames: boolean } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    const [hovering, setHovering] = useState<boolean>(false);
    const [requesting, setRequesting] = useState<boolean>(false);
    const [reqInflame, setReqInflame] = useState<boolean>(false);
    const [reqDeflame, setReqDeflame] = useState<boolean>(false);

    const inflame = useCallback(() => {

    }, [])

    const deflame = useCallback(() => {

    }, [])

    const Button = ({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button
            className={clsx(
                'group',
                'p-1 rounded-full',
                'flex items-center',
                'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                'active:scale-125',
                'transition-all',
                className
            )}
            {...rest}
        />
    )

    if (requesting) return (
        <div
            role="status"
            className={clsx(
                'cursor-pointer',
                reqInflame && 'applying',
                reqDeflame && 'canceling',
                'p-1 rounded-full',
                'flex items-center',
                'dark:bg-lighter/25 bg-darker/25',
                'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                'transition-colors duration-300',
            )}
        >
            <IconFlame className="!fill-white !text-white" />
        </div>
    )

    if (hovering) return (
        <Button
            aria-label="Desinflamar"
            className="!bg-rose-600"
            onMouseLeave={() => setHovering(false)}
            onClick={deflame}
            {...props}
        >
            <IconFlame className="!fill-white !text-white" />
        </Button >
    )

    if (inFlames) return (
        <Button
            aria-label="Inflamado"
            className="!bg-primary"
            onMouseEnter={() => setHovering(true)}
            onClick={deflame}
            {...props}
        >
            <IconFlame className="!fill-white !text-white" />
        </Button>
    )

    if (!inFlames) return (
        <Button
            aria-label="Inflamar"
            className="!text-white
            dark:bg-lighter/25 bg-darker/25
            hover:!bg-primary"
            onClick={inflame}
            {...props}
        >
            <IconFlame className="!fill-white !text-white" />
        </Button>
    )

    return null;

}