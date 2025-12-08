import { GoBack, H1, P } from "./elements";

export const Aside = (props: React.HTMLAttributes<HTMLElement>) => (
    <aside
        className="max-w-[333px] w-full mx-auto flex flex-col gap-6"
        {...props}
    >
        <H1>Patrocínio</H1>
        <P>A partir de 50 centavos.</P>
        <GoBack href='/'>Voltar</GoBack>
    </aside>
)