import { IconBoltFilled, IconBookFilled, IconFileTypeCss, IconFlaskFilled, IconLockFilled, IconPackage, IconRecycle, IconSparkles } from "@tabler/icons-react";
import { ReleaseEntryType } from "@/shared";

interface TopicProps extends React.HTMLAttributes<HTMLHeadingElement> {
    icon: React.ElementType;
}

const Topic = ({ icon: Icon, children, ...rest }: TopicProps) => (
    <h3 className="flex items-center gap-3" {...rest}>
        <span className="p-1 rounded-full dark:bg-secondary bg-primary">
            <Icon size={22} className="text-lighter" />
        </span>
        <span className="font-semibold text-xl dark:text-lighter text-darker">
            {children}
        </span>
    </h3>
)

interface ReleaseTopicProps extends React.LiHTMLAttributes<HTMLLIElement> {
    type: ReleaseEntryType
}

export const ReleaseTopic = ({ type, children, ...rest }: ReleaseTopicProps) => {

    if (type === 'sec') return (
        <li className="flex flex-col gap-3" {...rest}>
            <Topic icon={IconLockFilled}>Segurança</Topic>
            {children}
        </li>
    )

    if (type === 'feat') return (
        <li className="flex flex-col gap-3" {...rest}>
            <Topic icon={IconSparkles}>Implementação</Topic>
            {children}
        </li>
    )

    if (type === 'fix') return (
        <li className="flex flex-col gap-3" {...rest}>
            <Topic icon={IconSparkles}>Correção</Topic>
            {children}
        </li>
    )

    if (type === 'docs') return (
        <li className="flex flex-col gap-3" {...rest}>
            <Topic icon={IconBookFilled}>Documentação</Topic>
            {children}
        </li>
    )

    if (type === 'style') return (
        <li className="flex flex-col gap-3" {...rest}>
            <Topic icon={IconFileTypeCss}>Estilização</Topic>
            {children}
        </li>
    )

    if (type === 'refactor') return (
        <li className="flex flex-col gap-3" {...rest}>
            <Topic icon={IconRecycle}>Refatoração</Topic>
            {children}
        </li>
    )

    if (type === 'perf') return (
        <li className="flex flex-col gap-3" {...rest}>
            <Topic icon={IconBoltFilled}>Performance</Topic>
            {children}
        </li>
    )

    if (type === 'test') return (
        <li className="flex flex-col gap-3" {...rest}>
            <Topic icon={IconFlaskFilled}>Teste</Topic>
            {children}
        </li>
    )

    if (type === 'chore') return (
        <li className="flex flex-col gap-3" {...rest}>
            <Topic icon={IconPackage}>Manutenção</Topic>
            {children}
        </li>
    )

}