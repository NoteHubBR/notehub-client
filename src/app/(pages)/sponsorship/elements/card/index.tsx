import { Badge, Benefit, Benefits, GreaterThanOrEqual, H3, H4, H5, Period } from "./elements";
import { Form } from "@/components/forms";
import { Token } from "@/core";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    token: Token | null;
}

export const Card = ({ token, ...rest }: CardProps) => (
    <div
        className="!z-10 max-w-[333px] insm:max-w-[280px] p-[2px] rounded-2xl flex-none animated-gradient-border"
        {...rest}
    >
        <Badge />
        <div className="p-6 rounded-2xl flex flex-col gap-6 dark:bg-darker bg-lighter">
            <header className="flex flex-col gap-6">
                <H3>Eterno</H3>
                <div className="select-none flex">
                    <GreaterThanOrEqual></GreaterThanOrEqual>
                    <H4>R$ 0,50</H4>
                    <Period />
                </div>
                <H5>Seja eternizado como patrocinador e obtenha benefícios exclusivos.</H5>
            </header>
            <Benefits>
                <Benefit>Prioridade nas sugestões</Benefit>
                <Benefit>Distintivo exclusivo</Benefit>
                <Benefit>Avatar animado</Benefit>
            </Benefits>
            <Form.Sponsorship.Payment token={token} />
        </div>
    </div>
)