import Link from "next/link";

export const Unauthorized = () => (
    <section
        className="w-full h-full
        flex flex-col items-center justify-center gap-8
        text-center
        dark:bg-dark bg-light"
    >
        <h1 className="font-semibold text-xl">Esta página não está disponível.</h1>
        <h2 className="text-md">
            O link em que você clicou pode não estar funcionando ou a página pode ter sido removida.
            <Link href={'/'} className="p-1 font-medium text-primary request-btn">
                Voltar para NoteHub.
            </Link>
        </h2>
    </section>
)