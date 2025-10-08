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
                Nós não temos acesso à sua senha, pois ela é armazenada de forma criptografada em nosso banco de dados. Nunca
                solicitaremos sua senha em nenhuma situação.
                <br /><br />
                O seu e-mail é visível apenas para você dentro da aplicação e não é compartilhado com terceiros.
            </>
        )
    },
    {
        id: 'delete',
        keywords: ["delete", "excluir", "apagar", "conta", "remoção", "remover", "cancelar"],
        question: 'Exclusão da conta',
        answer: (
            <>
                A exclusão de conta é definitiva: seus dados pessoais serão removidos permanentemente, mas notas criadas
                (exceto ocultas; em perfis privados, todas são apagadas), comentários e respostas permanecerão visíveis.
                <br /><br />
                Caso deseje apagar completamente seu histórico, recomendamos excluir manualmente suas publicações antes
                de encerrar a conta.
            </>
        )
    },
    {
        id: 'history',
        keywords: ["history", "histórico", "historico", "dados", "alterações", "alteracoes", "mudanças", "mudancas"],
        question: 'Histórico',
        answer: (
            <>
                Registramos todas as alterações realizadas em sua conta. As senhas antigas também ficam criptografadas, garantindo
                total segurança.
                <br /><br />
                Em caso de recuperação de conta, validaremos cuidadosamente todas as informações antes de conceder acesso.
            </>
        )
    },
    {
        id: 'searches',
        keywords: ["searches", "pesquisas", "buscas", "procura", "consultas"],
        question: 'Pesquisas',
        answer: (
            <>
                Todas as suas pesquisas são armazenadas localmente no seu navegador.
                Não armazenamos o histórico de pesquisa em nossos servidores.
            </>
        )
    },
    {
        id: 'sponsors',
        keywords: ["sponsors", "patrocinadores", "patrocínio", "patrocionio", "verificado", "patrocinar", "apoiar", "apoio"],
        question: 'Patrocinador',
        answer: (
            <>
                Usuários que doarem qualquer quantia ao projeto receberão o emblema vitalício de patrocinador.
                <br /><br />
                Em breve disponibilizaremos detalhes sobre os benefícios exclusivos para patrocinadores.
            </>
        )
    },
    {
        id: 'privacy',
        keywords: ["privacy", "privacidade", "visibilidade", "conta", "perfil", "privado", "privar"],
        question: 'Privacidade',
        answer: (
            <>
                Quando sua conta está pública, todos podem visualizar suas notas, suas chamas, seus seguidores
                e quem você segue — salvo notas ocultas — mesmo aqueles que não possuem uma conta.
                <br /><br />
                Quando sua conta está privada, apenas mútuos podem visualizar suas notas, suas chamas, seus seguidores
                e quem você segue — salvo notas ocultas.
            </>
        )
    },
    {
        id: 'mutuals',
        keywords: ["mutuals", "mútuos", "iguais", "relação", "relacao", "relacionamento"],
        question: 'Mútuos',
        answer: (
            <>
                Um usuário é considerado mútuo quando existe uma relação bidirecional: ambos seguem-se mutuamente.
                <br /><br />
                Valorizamos a reciprocidade como critério de igualdade. Por isso, a mutualidade é fundamental para que
                um perfil privado possa ser acessado.
            </>
        )
    },
    {
        id: 'hiddenNotes',
        keywords: ["hiddennotes", "hidden", "notes", "notas", "ocultas", "privadas"],
        question: 'Notas ocultas',
        answer: <>Notas ocultas são visíveis apenas para quem as criou, embora contabilizem na contagem total de notas.</>
    },
    {
        id: 'closedNotes',
        keywords: ["closednotes", "closed", "notes", "notas", "fechadas", "trancadas", "bloqueadas"],
        question: 'Notas fechadas',
        answer: (
            <>
                Não é possível adicionar novos comentários ou respostas a notas fechadas. Comentários e respostas feitos
                enquanto a nota estava aberta permanecem mesmo após o fechamento.
                <br /><br />
                Apenas o autor do comentário ou da resposta pode removê-los, independentemente do estado da nota.
            </>
        )
    },
    {
        id: 'notifications',
        keywords: ["notifications", "notificações", "notificacoes", "alertas", "sino", "mensagens"],
        question: 'Notificações',
        answer: (
            <>
                Você recebe notificações quando alguém te segue, comenta ou inflama sua nota, ou responde a um comentário seu.
                <br /><br />
                Atualmente, não é possível desativar notificações individualmente, mas estamos trabalhando para oferecer
                controles personalizados em breve.
            </>
        )
    },
    {
        id: 'feed',
        keywords: ["feed", "início", "inicio", "principal", "central"],
        question: 'Feed',
        answer: (
            <>
                Seu feed é atualizado sempre que alguém que você segue publica uma nova nota.
                <br /><br />
                Em breve, ampliaremos os tipos de conteúdo exibidos e ofereceremos filtros para você personalizar
                as atualizações do seu feed.
            </>
        )
    },
    {
        id: 'subscriptions',
        keywords: ["subscriptions", "inscrição", "inscrições", "inscrito", "tópico", "email", "notificações", "notificacoes"],
        question: 'Inscrição',
        answer: (
            <>
                Ao se inscrever em um tópico, você passará a receber atualizações por e-mail sobre o que for mais relevante para você.
                <br /><br />
                Essas atualizações são importantes para que você acompanhe novidades e melhorias do serviço.
                Recomendamos que mantenha suas inscrições ativas, mas você pode cancelá-las a qualquer momento.
                <br /><br />
                Não enviamos spam nem e-mails promocionais — apenas informações úteis e relacionadas aos tópicos escolhidos.
            </>
        )
    },
    {
        id: 'report',
        keywords: ["repots", "denúncias", "denuncias", "avisar", "suporte"],
        question: 'Denúncia',
        answer: (
            <>
                Em breve, disponibilizaremos uma ferramenta interna para denúncias de usuários.
                <br /><br />
                Enquanto isso, envie seu relato pelo suporte ao usuário.
                <br /><br />
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
                Um usuário bloqueado não pode atualizar fotos do perfil, o bloqueio é devido à conteúdo impróprio.
                <br /><br />
                Caso discorde de um bloqueio, entre em contato com o suporte ao usuário para contestação.
                <br /><br />
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
                Caso discorde de um banimento, entre em contato com o suporte ao usuário para contestação.
                <br /><br />
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
                Não encontrou o que procura? Fale conosco pelo suporte ao usuário.
                <br /><br />
            </>
        ),
        useSupport: true
    }
]