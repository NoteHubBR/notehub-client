import { clsx } from 'clsx';
import { IconFlame } from '@tabler/icons-react';
import { LowDetailNote } from '@/core';
import { useCallback, useState } from 'react';
import { useFlames, useServices, useUser } from '@/data/hooks';

export const Flames = ({ note, ...rest }: { note: LowDetailNote } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    const { flameService: { inflameNote, deflameNote } } = useServices();

    const { token, user } = useUser();
    const { flames, setNewFlame, removeFlame } = useFlames();

    const inFlames = flames.some((f => f.note.id === note.id));

    const [count, setCount] = useState<number>(note.flames_count);
    const [hovering, setHovering] = useState<boolean>(false);
    const [requesting, setRequesting] = useState<boolean>(false);
    const [reqInflame, setReqInflame] = useState<boolean>(false);
    const [reqDeflame, setReqDeflame] = useState<boolean>(false);

    const inflame = useCallback(async () => {
        if (!token) return;
        setRequesting(true);
        setReqInflame(true);
        try {
            setNewFlame(await inflameNote(token.access_token, note.id));
        } finally {
            setRequesting(false);
            setReqInflame(false);
            setCount((prev) => (prev + 1));
        }
    }, [inflameNote, note.id, setNewFlame, token])

    const deflame = useCallback(async () => {
        if (!token) return;
        setRequesting(true);
        setReqDeflame(true);
        try {
            await deflameNote(token.access_token, note.id);
            removeFlame(note);
        } finally {
            setHovering(false);
            setRequesting(false);
            setReqDeflame(false);
            setCount((prev) => (prev - 1));
        }
    }, [deflameNote, note, removeFlame, token])

    const Button = ({ className, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
        <button
            className={clsx(
                'group',
                'p-1 rounded-full',
                'flex items-center',
                'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm',
                'active:scale-110',
                'transition-all',
                className
            )}
            {...rest}
        />
    )

    const Count = (props: React.HTMLAttributes<HTMLSpanElement>) => (
        <span className="pointer-events-none select-none text-sm" {...props}>{count}</span>
    )

    if (!user) return null;

    if (requesting) return (
        <div className="flex items-center gap-2">
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
                <IconFlame size={15} className="!fill-white !text-white" />
            </div>
            <Count />
        </div>
    )

    if (hovering) return (
        <div className="flex items-center gap-2">
            <Button
                aria-label="Desinflamar"
                className="!bg-rose-600"
                onMouseLeave={() => setHovering(false)}
                onClick={deflame}
                {...rest}
            >
                <IconFlame size={15} className="!fill-white !text-white" />
            </Button >
            <Count />
        </div>
    )

    if (inFlames) return (
        <div className="flex items-center gap-2">
            <Button
                aria-label="Inflamado"
                className="!bg-primary"
                onMouseEnter={() => setHovering(true)}
                onClick={deflame}
                {...rest}
            >
                <IconFlame size={15} className="!fill-white !text-white" />
            </Button>
            <Count />
        </div>
    )

    if (!inFlames) return (
        <div className="flex items-center gap-2">
            <Button
                aria-label="Inflamar"
                className="!text-white
            dark:bg-lighter/25 bg-darker/25
            hover:!bg-primary"
                onClick={inflame}
                {...rest}
            >
                <IconFlame size={15} className="!fill-white !text-white" />
            </Button>
            <Count />
        </div>
    )

    return null;

}