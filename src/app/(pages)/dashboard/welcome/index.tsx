import { Brands, Button, ButtonLink, Item, Span } from "./elements";
import { Icon } from "@/components/icons";
import { useScreen } from "@/data/hooks";

export const Welcome = (props: React.HTMLAttributes<HTMLElement>) => {

    const { onDesktop } = useScreen();

    return (
        <main className="w-full h-full flex flex-col dark:bg-darker bg-lighter" {...props}>
            <div className="w-full flex-1 flex inmd:flex-col inmd:justify-center gap-8 inmd:gap-6">
                <section className="inmd:w-full inmd:max-w-[333px] px-3 mx-auto flex flex-col items-center justify-center inmd:items-start">
                    <Icon.Logo width={onDesktop ? 666 : 111} height={0} />
                </section>
                <section className="inmd:w-full inmd:max-w-[333px] px-3 mr-auto [@media(max-width:1666px)]:mx-auto flex flex-col items-end justify-center gap-16 inmd:gap-6">
                    <header className="w-full">
                        <h1 className="font-extrabold text-7xl inlg:text-6xl inmd:text-5xl">
                            XYZ
                        </h1>
                        <h2 className="font-semibold text-2xl inlg:text-xl inmd:text-lg">
                            Organize, classifique e encontre.
                        </h2>
                    </header>
                    <div className="w-full flex flex-col gap-12 inmd:gap-6">
                        <section className="flex flex-col gap-4">
                            <header className="w-fit flex items-center gap-3">
                                <h3 className="font-medium text-xl">Conecte-se</h3>
                                <Brands />
                            </header>
                            <ButtonLink href="/signin" className="bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 text-white">
                                Entrar
                            </ButtonLink>
                            <Button className="dark:bg-semidark bg-semilight ">
                                Visitar
                            </Button>
                        </section>
                        <section className="flex flex-col gap-4">
                            <h4 className="font-medium text-lg">Não tem uma conta?</h4>
                            <ButtonLink href="/signup" className="bg-primary text-white">
                                Criar
                            </ButtonLink>
                            <p className="text-xs">
                                Ao se inscrever, você concorda com os
                                <Span href="/terms" className="ml-1">Termos de Serviço </Span>
                                {onDesktop && <br />}
                                e a <Span href="/policy" className="ml-1">Política de Privacidade</Span>, incluindo o
                                <Span href="/cookies" className="ml-1">Uso de Cookies</Span>.
                            </p>
                        </section>
                    </div>
                </section>
            </div>
            <footer className="p-2">
                <ul className="w-full mx-auto flex flex-wrap gap-3 justify-center">
                    <Item href="/" className="pointer-events-none select-none">© 2025 lucas-adm</Item>
                    <Item href="https://github.com/lucas-adm/springboot-xyz" target="_blank">Backend</Item>
                    <Item href="https://github.com/lucas-adm/next-react-xyz" target="_blank">Frontend</Item>
                    <Item href="/terms">Termos de Serviço</Item>
                    <Item href="/policy">Política de Privacidade</Item>
                    <Item href="/cookies">Cookies</Item>
                    <Item href="/help" target="_blank">Ajuda</Item>
                    <Item href="mailto:suporte@xisyz.xyz">Suporte</Item>
                </ul>
            </footer>
        </main>
    )

}