export interface Items {
    id: string;
    keywords: string[];
    question: string;
    answer: React.ReactNode;
    useSupport?: boolean;
}

export const items: Items[] = [
    {
        id: 'language',
        keywords: ["language", "idioma", "linguagem", "português", "portugues", "tempo", "gmt", "hora"],
        question: 'Idioma',
        answer: <>Atualmente, a aplicação está disponível apenas em Português (PT-BR) e opera no fuso horário GMT-3.</>
    },
    {
        id: 'security',
        keywords: ["security", "segurança", "seguranca", "senha", "email", "conta"],
        question: 'Segurança',
        answer: (
            <>
                <p>
                    Nós não temos acesso à sua senha, pois ela é armazenada de forma criptografada em nosso banco de dados. Nunca
                    solicitaremos sua senha em nenhuma situação.
                </p>
                <br />
                <p>
                    O seu e-mail é visível apenas para você dentro da aplicação e não é compartilhado com terceiros.
                </p>
            </>
        )
    },
    {
        id: 'delete',
        keywords: ["delete", "excluir", "apagar", "conta", "remoção", "remover", "cancelar"],
        question: 'Exclusão da conta',
        answer: (
            <>
                <p>
                    A exclusão de conta é definitiva: seus dados pessoais serão removidos permanentemente, mas notas criadas
                    (exceto ocultas; em perfis privados, todas são apagadas), comentários e respostas permanecerão visíveis.
                </p>
                <br />
                <p>
                    Caso deseje apagar completamente seu histórico, recomendamos excluir manualmente suas publicações antes
                    de encerrar a conta.
                </p>
            </>
        )
    },
    {
        id: 'history',
        keywords: ["history", "histórico", "historico", "dados", "alterações", "alteracoes", "mudanças", "mudancas"],
        question: 'Histórico',
        answer: (
            <>
                <p>
                    Registramos todas as alterações realizadas em sua conta. As senhas antigas também ficam criptografadas, garantindo
                    total segurança.
                </p>
                <br />
                <p>
                    Em caso de recuperação de conta, validaremos cuidadosamente todas as informações antes de conceder acesso.
                </p>
            </>
        )
    },
    {
        id: 'searches',
        keywords: ["searches", "pesquisas", "buscas", "procura", "consultas"],
        question: 'Pesquisas',
        answer: (
            <>
                <p>
                    Todas as suas pesquisas são armazenadas localmente no seu navegador.
                    Não armazenamos o histórico de pesquisa em nossos servidores.
                </p>
            </>
        )
    },
    {
        id: 'sponsors',
        keywords: [
            "sponsors", "sponsor", "sponsorship", "patrocinador", "patrocinadores", "patrocínio", "patrocionio", "patrocinar",
            "apoiar", "apoio", "doação", "doar",
            "verificado", "premium", "gif", "distintivo", "badge"
        ],
        question: 'Patrocinador',
        answer: (
            <>
                <p>
                    Usuários que doarem a partir de <strong>R$ 0,50</strong> ao projeto se tornam patrocinadores vitalícios,
                    com acesso a benefícios exclusivos.
                </p>
                <br />
                <p>Benefícios de patrocinador:</p>
                <br />
                <ul>
                    <li>
                        • Prioridade no atendimento de sugestões e novas funcionalidades
                    </li>
                    <li>
                        • Distintivo exclusivo ao lado do nome e no cartão de perfil
                    </li>
                    <li>
                        • Upload de imagens GIF até 12MB
                    </li>
                </ul>
                <br />
                <p>Em breve:</p>
                <br />
                <ul>
                    <li className="dark:text-midlight/50 text-middark/50">
                        • Sistema de presentes de patrocínio entre usuários
                    </li>
                    <li className="dark:text-midlight/50 text-middark/50">
                        • Opção para ocultar o distintivo de patrocinador publicamente
                    </li>
                </ul>
            </>
        )
    },
    {
        id: 'privacy',
        keywords: ["privacy", "privacidade", "visibilidade", "conta", "perfil", "privado", "privar"],
        question: 'Privacidade',
        answer: (
            <>
                <p>
                    Quando sua conta está pública, todos podem visualizar suas notas, suas chamas, seus seguidores
                    e quem você segue — salvo notas ocultas — mesmo aqueles que não possuem uma conta.
                </p>
                <br />
                <p>
                    Quando sua conta está privada, apenas mútuos podem visualizar suas notas, suas chamas, seus seguidores
                    e quem você segue — salvo notas ocultas.
                </p>
            </>
        )
    },
    {
        id: 'mutuals',
        keywords: ["mutuals", "mútuos", "iguais", "relação", "relacao", "relacionamento"],
        question: 'Mútuos',
        answer: (
            <>
                <p>
                    Um usuário é considerado mútuo quando existe uma relação bidirecional: ambos seguem-se mutuamente.
                </p>
                <br />
                <p>
                    Valorizamos a reciprocidade como critério de igualdade. Por isso, a mutualidade é fundamental para que
                    um perfil privado possa ser acessado.
                </p>
            </>
        )
    },
    {
        id: 'hiddenNotes',
        keywords: ["hiddennotes", "hidden", "notes", "notas", "ocultas", "privadas"],
        question: 'Notas ocultas',
        answer: <><p>Notas ocultas são visíveis apenas para quem as criou, embora contabilizem na contagem total de notas.</p></>
    },
    {
        id: 'closedNotes',
        keywords: ["closednotes", "closed", "notes", "notas", "fechadas", "trancadas", "bloqueadas"],
        question: 'Notas fechadas',
        answer: (
            <>
                <p>
                    Não é possível adicionar novos comentários ou respostas a notas fechadas. Comentários e respostas feitos
                    enquanto a nota estava aberta permanecem mesmo após o fechamento.
                </p>
                <br />
                <p>
                    Apenas o autor do comentário ou da resposta pode removê-los, independentemente do estado da nota.
                </p>
            </>
        )
    },
    {
        id: 'notifications',
        keywords: ["notifications", "notificações", "notificacoes", "alertas", "sino", "mensagens"],
        question: 'Notificações',
        answer: (
            <>
                <p>
                    Você recebe notificações quando alguém te segue, comenta ou inflama sua nota, ou responde a um comentário seu.
                </p>
                <br />
                <p>
                    Atualmente, não é possível desativar notificações individualmente, mas estamos trabalhando para oferecer
                    controles personalizados em breve.
                </p>
            </>
        )
    },
    {
        id: 'feed',
        keywords: ["feed", "início", "inicio", "principal", "central"],
        question: 'Feed',
        answer: (
            <>
                <p>
                    Seu feed é atualizado sempre que alguém que você segue publica uma nova nota.
                </p>
                <br />
                <p>
                    Em breve, ampliaremos os tipos de conteúdo exibidos e ofereceremos filtros para você personalizar
                    as atualizações do seu feed.
                </p>
            </>
        )
    },
    {
        id: 'subscriptions',
        keywords: ["subscriptions", "inscrição", "inscrições", "inscrito", "tópico", "email", "notificações", "notificacoes"],
        question: 'Inscrição',
        answer: (
            <>
                <p>
                    Ao se inscrever em um tópico, você passará a receber atualizações por e-mail sobre o que for mais relevante para você.
                </p>
                <br />
                <p>
                    Essas atualizações são importantes para que você acompanhe novidades e melhorias do serviço.
                    Recomendamos que mantenha suas inscrições ativas, mas você pode cancelá-las a qualquer momento.
                </p>
                <br />
                <p>
                    Não enviamos spam nem e-mails promocionais — apenas informações úteis e relacionadas aos tópicos escolhidos.
                </p>
            </>
        )
    },
    {
        id: 'report',
        keywords: ["repots", "denúncias", "denuncias", "avisar", "suporte"],
        question: 'Denúncia',
        answer: (
            <>
                <p>
                    Em breve, disponibilizaremos uma ferramenta interna para denúncias de usuários.
                </p>
                <br />
                <p>
                    Enquanto isso, envie seu relato pelo suporte ao usuário.
                </p>
                <br />
            </>
        ),
        useSupport: true
    },
    {
        id: 'blocked',
        keywords: ["blocked", "block", "bloqueio", "bloqueado", "proibido", "excluido", "apagado", "cancelado", "silenciado", "suporte"],
        question: 'Bloqueio',
        answer: (
            <>
                <p>
                    Um usuário bloqueado não pode atualizar fotos do perfil, o bloqueio é devido à conteúdo impróprio.
                </p>
                <br />
                <p>
                    Caso discorde de um bloqueio, entre em contato com o suporte ao usuário para contestação.
                </p>
                <br />
            </>
        ),
        useSupport: true
    },
    {
        id: 'ban',
        keywords: ["ban", "banir", "banido", "banimento", "excluído", "excluido", "apagado", "cancelado", "silenciado", "suporte"],
        question: 'Banimento',
        answer: (
            <>
                <p>
                    Caso discorde de um banimento, entre em contato com o suporte ao usuário para contestação.
                </p>
                <br />
            </>
        ),
        useSupport: true
    },
    {
        id: 'other',
        keywords: ["others", "outras", "outros", "suporte", "email", "mensagem"],
        question: 'Outra',
        answer: (
            <>
                <p>
                    Não encontrou o que procura? Fale conosco pelo suporte ao usuário.
                </p>
                <br />
            </>
        ),
        useSupport: true
    }
]