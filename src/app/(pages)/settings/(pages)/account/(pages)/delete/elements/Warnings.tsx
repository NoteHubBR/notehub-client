import Link from "next/link";

export const Warnings = () => (
    <div className="mt-3 flex flex-col gap-3">
        <p className="font-medium text-sm dark:text-midlight/60 text-middark/60">
            A exclusão da conta é permanente: todos os dados pessoais serão removidos,
            mas seu histórico permanecerá. Os seguintes itens NÃO serão apagados:
        </p>
        <ol className="list-inside list-disc font-medium text-sm dark:text-midlight/60 text-middark/60">
            <li>
                Notas criadas.
                <Link href="/help#delete" className="ml-1 dark:text-secondary text-primary hover:underline">
                    Saiba mais
                </Link>
            </li>
            <li>Comentários publicados</li>
            <li>Respostas enviadas</li>
        </ol>
        <p className="font-medium text-sm dark:text-midlight/60 text-middark/60">
            Veja abaixo como um artigo de um usuário excluído é exibido:
        </p>
    </div>
)