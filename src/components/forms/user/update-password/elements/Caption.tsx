import { scrollTo as scrollToId } from '@/core';
import Link from 'next/link';

interface CaptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
    scrollTo: string;
}

export const Caption = ({ scrollTo, children, ...rest }: CaptionProps) => (
    <p
        className="-my-2 font-normal text-sm dark:text-midlight/60 text-middark/60"
        {...rest}
    >
        {children}
        <span className="ml-1">
            <Link
                href="/help"
                onClickCapture={scrollToId(scrollTo)}
                className='text-secondary focus:underline focus-visible:underline hover:underline'
            >
                Saiba mais
            </Link>
        </span>
    </p>
)