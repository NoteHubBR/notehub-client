import { Link } from "./elements";

interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    subtitle: string;
    message: string;
}

export const Hero = ({ title, subtitle, message, ...rest }: HeroProps) => (
    <div className="px-4 insm:py-4 flex items-center justify-center">
        <div className="max-w-[444px] w-full mx-auto flex flex-col gap-12 inmd:gap-8" {...rest}>
            <section className="flex flex-col gap-6 inmd:gap-4">
                <h2 className="text-semibold text-5xl insm:text-center inmd:text-3xl">{title}</h2>
                <h3 className="text-medium text-2xl insm:text-center inmd:text-lg">{subtitle}</h3>
            </section>
            <Link>{message}</Link>
        </div>
    </div>
)