'use client';

import { clsx } from 'clsx';
import { createPortal } from 'react-dom';
import { Icon } from './icons';
import { IconLock, IconWorld } from '@tabler/icons-react';
import { LowDetailUser, User } from '@/core';
import { Photo } from './Photo';
import { Toggle } from './buttons';
import { useCallback, useEffect, useState, useRef } from 'react';
import { useScreen, useStore } from '@/data/hooks';
import Link from 'next/link';

interface HovercardProps {
    ref: React.RefObject<HTMLElement>;
    user: User | LowDetailUser;
}

export const Hovercard = ({ ref, user }: HovercardProps) => {

    const { isMenuOpen } = useStore();
    const { onMobile } = useScreen();

    const [position, setPosition] = useState({ top: 0, left: 0, direction: 'below' as 'below' | 'above', leftHalf: true });
    const [isHoveringRef, setIsHoveringRef] = useState(false);
    const [isHoveringCard, setIsHoveringCard] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const showDelay = 500;
    const hideDelay = 250;
    const showTimer = useRef<NodeJS.Timeout | null>(null);
    const hideTimer = useRef<NodeJS.Timeout | null>(null);

    const handlePosition = useCallback((): void => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const scrollY = window.pageYOffset;
        const scrollX = window.pageXOffset;
        const viewportMidY = window.innerHeight / 2;
        const viewportMidX = window.innerWidth / 2;
        const above = rect.top < viewportMidY;
        const leftHalf = rect.left < viewportMidX;
        const top = above ? rect.bottom + scrollY : rect.top + scrollY;
        const left = leftHalf ? rect.left + scrollX : rect.right + scrollX - 366;
        return setPosition({ top, left, direction: above ? 'below' : 'above', leftHalf });
    }, [ref])

    useEffect(() => {

        if (!ref.current) return;
        const element = ref.current;

        handlePosition();
        const onEnterRef = () => setIsHoveringRef(true);
        const onLeaveRef = () => setIsHoveringRef(false);

        element.addEventListener('mouseenter', onEnterRef);
        element.addEventListener('mouseleave', onLeaveRef);
        window.addEventListener('scroll', handlePosition);
        window.addEventListener('resize', handlePosition);

        return () => {
            element.removeEventListener('mouseenter', onEnterRef);
            element.removeEventListener('mouseleave', onLeaveRef);
            window.removeEventListener('scroll', handlePosition);
            window.removeEventListener('resize', handlePosition);
            if (showTimer.current) clearTimeout(showTimer.current);
            if (hideTimer.current) clearTimeout(hideTimer.current);
        }

    }, [ref, handlePosition, isMenuOpen])

    useEffect(() => {
        if (isHoveringRef || isHoveringCard) {
            if (hideTimer.current) {
                clearTimeout(hideTimer.current);
                hideTimer.current = null;
            }
            if (!isVisible && !showTimer.current) {
                showTimer.current = setTimeout(() => {
                    setIsVisible(true);
                    showTimer.current = null;
                }, showDelay)
            }
        } else {
            if (showTimer.current) {
                clearTimeout(showTimer.current);
                showTimer.current = null;
            }
            if (isVisible && !hideTimer.current) {
                hideTimer.current = setTimeout(() => {
                    setIsVisible(false);
                    hideTimer.current = null;
                }, hideDelay)
            }
        }

    }, [isHoveringRef, isHoveringCard, isVisible, showDelay, hideDelay])

    if (onMobile) return null;

    const Desc = ({ label, count }: { label: string; count: number }) => (
        <div className="flex flex-col items-center">
            <dt className="text-md">{count}</dt>
            <dd className="text-sm dark:text-midlight text-middark">{label}</dd>
        </div>
    )

    const Dialog = ({ icon: IconComponent, message, desc }: { icon: React.ElementType; message: string; desc: string }) => (
        <div
            role="dialog"
            aria-labelledby="dialogTitle"
            aria-describedby="dialogDesc"
            className="px-6 py-3 flex items-center gap-3 border-y dark:border-middark border-midlight"
        >
            <div className="p-[2px] rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-red-600">
                <figure className="p-2 rounded-full dark:bg-darker bg-lighter">
                    <IconComponent size={30} className="rounded-full dark:text-midlight text-middark" />
                </figure>
            </div>
            <div>
                <h2 id="dialogTitle" >{message}</h2>
                <p id="dialogDesc" className="text-sm dark:text-midlight text-middark">{desc}</p>
            </div>
        </div>
    )

    if (!isVisible) return null;

    return createPortal(
        <aside role="tooltip" aria-label={`Informações sobre ${user.username}`}
            onMouseEnter={() => setIsHoveringCard(true)}
            onMouseLeave={() => setIsHoveringCard(false)}
            style={{
                top: position.top,
                left: position.left,
                transform: position.direction === 'above' ? 'translateY(-105%)' : undefined
            }}
            className={clsx(
                'absolute',
                'w-[366px] rounded',
                'dark:bg-darker bg-lighter',
                'dark:drop-shadow-alpha-l-md drop-shadow-alpha-d-md',
                'after:absolute after:w-3 after:h-3 after:dark:bg-darker after:bg-lighter after:rotate-45',
                position.direction === 'above' ? 'm-0' : 'mt-4',
                position.direction === 'above' ? 'after:bottom-0 after:translate-y-1/2' : 'after:top-0 after:-translate-y-1/2',
                position.leftHalf ? 'after:left-4' : 'after:right-4'
            )}
        >
            {user.sponsor && (
                <figure
                    className="z-10 absolute top-0 right-0 p-1 rounded-tr bg-gradient-to-r from-blue-600 via-purple-600 to-red-600"
                    style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}
                >
                    <Icon.Sponsor size={22} user={user} useWhite className="ml-5 mb-5" />
                </figure>
            )}
            <header className="px-6 pt-3 flex items-center gap-3">
                <Link href={`/${user.username}`}>
                    <Photo size={50} user={user} />
                </Link>
                <div>
                    <Link href={`/${user.username}`} className="font-semibold">
                        {user.username}
                    </Link>
                    <p className="font-medium dark:text-midlight text-middark">{user.display_name}</p>
                </div>
            </header>
            <dl className="px-6 py-3 flex items-center justify-evenly">
                <Desc label="notas" count={0} />
                <Desc label="seguidores" count={user.followers_count} />
                <Desc label="seguindo" count={user.following_count} />
            </dl>
            {user.profile_private
                ? <Dialog icon={IconLock} message="Perfil privado" desc="Apenas mútuos podem acessá-lo" />
                : <Dialog icon={IconWorld} message="Perfil público" desc="Todos podem acessá-lo" />
            }
            <footer className="py-3 px-6">
                <Toggle.Follow user={user} useIcon useText />
            </footer>
        </aside>,
        document.body
    )

}