import { clsx } from 'clsx';
import { Disconnect } from './Disconnect';
import { IconBrandAndroid, IconBrandApple, IconBrandDebian, IconBrandWindows, IconSpy } from '@tabler/icons-react';
import { Session, toRelativeTime } from '@/core';
import { useRouter } from 'next/navigation';
import { useServices, useUser } from '@/data/hooks';
import { useTransition } from 'react';

interface ItemProps extends React.LiHTMLAttributes<HTMLLIElement> {
    device: string;
    session: Session;
    setSessions: React.Dispatch<React.SetStateAction<Session[] | null>>;
}

export const Item = ({ device, session, setSessions, ...rest }: ItemProps) => {

    const { authService } = useServices();

    const { clearUser } = useUser();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDisconnectSession = () => startTransition(async () => {
        await authService.disconnectSession(session.id);
        setSessions((prev) => prev ? prev.filter(s => s.id !== session.id) : null);
        if (device === session.device) {
            clearUser({ skipLogout: true });
            router.push('/');
        }
        return;
    })

    const osIcons: Record<string, JSX.Element> = {
        Linux: <IconBrandDebian />,
        macOS: <IconBrandApple />,
        iOS: <IconBrandApple />,
        Android: <IconBrandAndroid />,
        Windows: <IconBrandWindows />
    }

    return (
        <li className="min-h-12 px-2 flex gap-6" {...rest}>
            <figure className='pointer-events-none self-center'>
                {osIcons[session.os] ?? <IconSpy />}
            </figure>
            <div className='pointer-events-none flex-1 flex flex-col gap-1'>
                <p className='capitalize font-semibold text-sm'>
                    {session.os}, {session.deviceType}, {session.browser}
                </p>
                <p className='text-sm dark:text-midlight/75 text-middark/75'>
                    {session.country}, {session.region}, {session.city}
                </p>
                <p className={clsx(
                    'font-medium text-xs ',
                    session.device === device
                        ? 'w-fit p-1 rounded-full bg-primary text-light'
                        : 'dark:text-semilight/50 text-semidark/50 bg-transparent'
                )}>
                    {session.device === device ? 'Esta sessão' : toRelativeTime(session.createdAt)}
                </p>
            </div>
            <Disconnect
                aria-label='Desconectar sessão'
                disabled={isPending}
                onClick={handleDisconnectSession}
            />
        </li>
    )

}