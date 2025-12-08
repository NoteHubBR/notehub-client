import { useUser } from '@/data/hooks';
import { BgImg, Claim, Close, Desc, Title } from './elements';
import { clsx } from 'clsx';

interface SponsorshipProps extends React.HTMLAttributes<HTMLElement> {
    isSponsorshipInviteAllowed?: boolean;
    skipClose?: boolean;
}

export const Sponsorship = ({ isSponsorshipInviteAllowed, skipClose, className, ...rest }: SponsorshipProps) => {

    const { user } = useUser();

    if (user && user.sponsor) return <></>;

    if (isSponsorshipInviteAllowed) return (
        <section
            aria-labelledby='sponsorshipTitle'
            aria-describedby='sponsorshipDesc'
            className={clsx(
                'select-none',
                'px-6 py-3 rounded-xl',
                'inlg:col-span-2 inlg:row-start-2',
                'flex flex-col gap-3',
                'dark:bg-gradient-to-r dark:from-darker dark:via-primary dark:to-secondary',
                'bg-gradient-to-r from-semidark via-primary to-secondary',
                'shine',
                className
            )}
            {...rest}
        >
            <BgImg />
            <Close hidden={skipClose} />
            <header className='flex flex-col gap-3'>
                <Title id='sponsorshipTitle'>
                    Torne-se um patrocinador
                </Title>
                <Desc id='sponsorshipDesc'>
                    Apoie o projeto e receba benefícios exclusivos vitalícios!
                </Desc>
            </header>
            <footer>
                <Claim href='/sponsorship' />
            </footer>
        </section>
    )

}