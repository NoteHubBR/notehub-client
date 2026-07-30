import { clsx } from "clsx";
import { GoBack, Title } from './elements';

interface Props extends React.HTMLAttributes<HTMLElement> {
    useDarkTheme: boolean;
    title: string;
}

export const Header = ({ useDarkTheme, title, ...rest }: Props) => (
    <header
        className={clsx(useDarkTheme ? 'dark-changelog-header' : 'light-changelog-header')}
        {...rest}
    >
        <div
            className={clsx(
                'max-w-[666px] w-full mx-auto py-12',
                'border-b dark:border-semidark border-semilight',
                'flex flex-col gap-6',
            )}
        >
            <GoBack />
            <Title>{title}</Title>
        </div>
    </header>
)