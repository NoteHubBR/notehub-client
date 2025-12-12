import Link from "next/link";

export const Forbidden = () => (
    <section className="w-full h-full p-8 flex flex-col items-center justify-center gap-8 text-center">
        <h1 className="font-semibold text-xl">
            Esta página não está disponível.
        </h1>
        <h2 className="text-md">
            O link em que você clicou pode não estar funcionando ou a página pode ter sido removida.<br />
            <Link href={'/'} className="ml-1 p-1 font-medium text-primary request-btn">
                Voltar para NoteHub.
            </Link>
        </h2>
    </section>
)