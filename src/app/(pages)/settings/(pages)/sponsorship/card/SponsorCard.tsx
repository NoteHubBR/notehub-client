import { clsx } from 'clsx';
import { Desc, Help, Icon, Title } from './elements';
import { IconGiftFilled } from '@tabler/icons-react';
import { scrollTo } from '@/core';

export const SponsorCard = (props: React.HTMLAttributes<HTMLElement>) => (
    <section
        aria-labelledby='sponsorcardTitle'
        aria-describedby='sponsorcardDesc'
        className={clsx(
            'select-none',
            'mt-6 px-8 py-4 insm:p-4 rounded-xl',
            'inlg:col-span-2 inlg:row-start-2',
            'flex flex-col gap-3',
            'bg-transparent',
            'dark:bg-gradient-to-r dark:from-darker dark:via-dark dark:to-semidark',
            'bg-gradient-to-r from-semilight via-light to-lighter',
            'dark:drop-shadow-alpha-l-sm drop-shadow-alpha-d-sm'
        )}
        {...props}
    >
        <div className="flex items-start gap-4">
            <Icon icon={IconGiftFilled} />
            <div className="flex flex-col gap-2">
                <Title id='sponsorcardTitle'>
                    Você é um patrocinador!
                </Title>
                <Desc id='sponsorcardDesc'>
                    Agradecemos imensamente seu apoio.<br/>
                    Como patrocinador, você tem acesso a benefícios exclusivos vitalícios.
                </Desc>
                <Help href='/help' onClick={scrollTo('sponsors')} />
            </div>
        </div>
    </section>
)