import { clsx } from 'clsx';
import { IconFlame } from '@tabler/icons-react';
import { LowDetailNote } from '@/core';
import { useCallback, useState } from 'react';
import { useFlames, useServices, useUser } from '@/data/hooks';

export const Flame = ({ note, ...rest }: { note: LowDetailNote } & React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    const { flameService: { inflameNote, deflameNote } } = useServices();

    const { token, user } = useUser();
    const { flames, setNewFlame, removeFlame } = useFlames();

    const inFlames = flames.some((f => f.note.id === note.id));

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

    if (!user) return null;

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
            {...rest}
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
            {...rest}
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
            {...rest}
        >
            <IconFlame className="!fill-white !text-white" />
        </Button>
    )

    return null;

}