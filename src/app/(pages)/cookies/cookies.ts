type Info = {
    title: string;
    description: string;
}

export const infos: Info[] = [
    {
        title: 'O que são Cookies',
        description: 'Cookies são pequenos arquivos de texto armazenados no seu navegador que permitem reconhecer seu dispositivo e manter informações entre acessos à Plataforma.'
    },
    {
        title: 'Cookie Utilizado',
        description: 'O NoteHub utiliza exclusivamente um cookie, denominado "rtoken", cuja única finalidade é armazenar o refresh token da sua sessão de autenticação. Esse cookie é essencial para manter você conectado à Plataforma e renovar seu acesso de forma segura, sem a necessidade de novo login constante.'
    },
    {
        title: 'Cookies de Terceiros',
        description: 'O NoteHub não utiliza cookies de rastreamento, publicidade ou analytics de terceiros. O único cookie definido pertence à própria Plataforma e é de natureza estritamente funcional.'
    },
    {
        title: 'Gerenciamento do Cookie',
        description: 'Como o cookie "rtoken" é essencial para o funcionamento da autenticação, removê-lo manualmente pelo navegador resultará no encerramento da sua sessão, sendo necessário realizar login novamente. Você pode gerenciar ou excluir cookies a qualquer momento pelas configurações do seu navegador.'
    },
    {
        title: 'Alterações nesta Política',
        description: 'Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças na forma como o NoteHub utiliza cookies. Recomendamos a revisão periódica desta página.'
    },
    {
        title: 'Contato',
        description: 'Em caso de dúvidas sobre o uso de cookies, entre em contato através do suporte ao usuário.'
    },
]