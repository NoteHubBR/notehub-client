type Policy = {
    title: string;
    description: string;
}

export const policies: Policy[] = [
    {
        title: 'Introdução',
        description: 'Esta Política de Privacidade descreve como o NoteHub coleta, utiliza, armazena e protege os dados pessoais dos usuários da Plataforma, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018). O NoteHub não possui CNPJ registrado, sendo operado por seu(s) responsável(is) de forma independente.'
    },
    {
        title: 'Dados Coletados',
        description: 'Coletamos os seguintes dados pessoais: e-mail e senha (armazenada de forma criptografada); nome/username e foto de perfil; endereço IP e informações de user-agent (dispositivo e navegador); e dados de geolocalização, obtidos no momento da geração do token de autenticação. Também podem ser coletados dados de conteúdo gerado pelo usuário, como notas, comentários e respostas.'
    },
    {
        title: 'Finalidade do Tratamento',
        description: 'Os dados são utilizados para: viabilizar a criação e manutenção da sua conta; autenticar seu acesso de forma segura; exibir a localização aproximada de cada sessão em Configurações → Seus dispositivos, permitindo identificar acessos não reconhecidos; processar doações de patrocínio; e enviar comunicações relacionadas a tópicos que você tenha se inscrito.'
    },
    {
        title: 'Compartilhamento com Terceiros',
        description: 'Para viabilizar o funcionamento da Plataforma, compartilhamos dados com os seguintes serviços terceirizados: Stripe, para processamento de doações e pagamentos; Supabase, para armazenamento de arquivos e imagens; RabbitMQ, para envio de e-mails transacionais; e MaxMind, para conversão do endereço IP em dados de geolocalização aproximada. Esses serviços têm acesso apenas aos dados estritamente necessários para a função que desempenham e possuem suas próprias políticas de privacidade.'
    },
    {
        title: 'Cookies',
        description: 'O NoteHub utiliza um único cookie, "rtoken", com a finalidade exclusiva de armazenar o refresh token de autenticação. Não utilizamos cookies de rastreamento ou publicidade. Mais detalhes estão disponíveis em nossa Política de Cookies.'
    },
    {
        title: 'Segurança dos Dados',
        description: 'Sua senha é armazenada de forma criptografada e nunca é solicitada pela equipe do NoteHub. Senhas anteriores também permanecem criptografadas em nosso histórico. Seu e-mail é visível apenas para você dentro da aplicação e não é compartilhado publicamente. Mantemos registro de alterações relevantes realizadas em sua conta para fins de segurança e auditoria.'
    },
    {
        title: 'Direitos do Titular dos Dados',
        description: 'Nos termos da LGPD, você tem direito a: confirmar a existência de tratamento de dados; acessar seus dados; corrigir dados incompletos ou desatualizados; solicitar a exclusão de dados pessoais; e revogar consentimentos previamente concedidos, como inscrições em tópicos. Esses direitos podem ser exercidos diretamente pelas configurações da conta ou através do suporte ao usuário.'
    },
    {
        title: 'Retenção e Exclusão de Dados',
        description: 'Ao excluir sua conta, seus dados pessoais são removidos permanentemente. Notas criadas permanecem visíveis publicamente, exceto notas ocultas ou notas pertencentes a perfis que eram privados no momento da exclusão, que são apagadas integralmente. Comentários e respostas permanecem visíveis mesmo após a exclusão da conta, associados ao registro do autor conforme necessário para manter a integridade das conversas.'
    },
    {
        title: 'Dados de Pesquisa',
        description: 'O histórico de pesquisas realizadas na Plataforma é armazenado localmente no seu navegador e não é enviado ou armazenado em nossos servidores.'
    },
    {
        title: 'Alterações nesta Política',
        description: 'Esta Política de Privacidade pode ser atualizada periodicamente. Alterações significativas serão comunicadas através da Plataforma ou por e-mail cadastrado. Recomendamos a revisão periódica desta página.'
    },
    {
        title: 'Contato',
        description: 'Em caso de dúvidas sobre esta Política de Privacidade ou para exercer seus direitos como titular de dados, entre em contato através do suporte ao usuário.'
    },
]