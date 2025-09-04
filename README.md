
## NoteHub versão alpha (frontend)

#### NoteHub é um projeto open-source que fornece uma interface web para o "Bloco de Notas Social", construída com Next.js + React. A aplicação oferece uma experiência de usuário intuitiva para criar, visualizar, compartilhar e interagir com notas. O projeto segue uma arquitetura moderna com SSR/SSG do Next.js, gerenciamento de estado com React Context e estilização com Tailwind CSS + Sass. Ele foi estruturado para ser simples de entender e fácil de contribuir — perfeito para quem quer praticar desenvolvimento frontend moderno integrado a uma API real.

<br>

<div align="center">
  <a href="https://notehub.com.br">
    <img width="10%" height="10%" src="https://github.com/notehubbr/notehub-api/blob/main/src/main/resources/public/imgs/logo.png">
  </a>
</div>
<br>
<div align="center">
  <a href="https://github.com/notehubbr/notehub-client/releases/tag/v1.0">
    <img width="100px" height="25px" src="https://img.shields.io/badge/notehub-v1.0-7c3aed">
  </a>
</div>

## Instalação
#### Pré-requisitos:

  - [Backend](https://github.com/notehubbr/notehub-api) (aberto)
  - Node
  
  1. Digite os seguintes comandos no terminal dentro da pasta desejada:
  ```bash
    git clone https://github.com/notehubbr/notehub-client.git
    cd next-react-notehub
  ```

  2. Instale os pacotes necessários:
  ```bash
    npm i
  ```

  3. Copie o arquivo de exemplo de variáveis de ambiente e ajuste conforme necessário:
  ```bash
    (Linux e macOS) cp .env.example .env
    (Windows) copy .env.example .env
  ```

  4. Para o ambiente de desenvolvimento (com hot reload):
  ```bash
    npm run dev
  ```

  5. Para o ambiente de produção:
  ```bash
    npm run build
    npm run start
  ```

  6. Acesse em `http://localhost:3000` (por padrão). A rota de ajuda normalmente fica em `http://localhost:3000/help`.

  7. Para parar a execução basta acionar as teclas `CTRL+C` dentro do terminal em execução.

## Documentação
#### A API é documentada em Swagger e acessível em <a href="https://api.notehub.com.br/docs">/docs</a>

## Relato de erros
#### Use o sistema de Issues do GitHub, crie uma issue com passos para reproduzir, comportamento esperado e logs/erros.

## Sugestão
#### Deixe um comentário com a nova ideia/sugestão na <a href="https://notehub.com.br/notehub/52b89a65-1c87-4692-9bf8-5096b674fa40">postagem dedicada.</a>

## Contribuição
#### Contribuições são mais do que bem-vindas! Aqui vai um fluxo sugerido para colaboradores:

  1. Fork -> clone -> crie uma branch com um nome descritivo:
  ```bash
    git checkout -b feat/nova-funcionalidade
  ```

  2. Faça commits em inglês, pequenos e claros seguindo o padrão: `(emoji) (escopo)(referência):(mensagem)`. Ex.:
  ```bash
    git commit -m "✨ feat(auth): add login via Discord"
  ```

  3. Sincronize com o upstream (se estiver forked) e abra um Pull Request descrevendo:
  - O que foi alterado;
  - Porquê a alteração é necessária;
  - Como testar manualmente;

  4. Preencha checklist no PR:
  - [ ] Código segue o padrão do projeto
  - [ ] Testes adicionados/atualizados
  - [ ] Documentação atualizada (se necessário)

  5. Boas práticas para PRs
  - Um propósito por PR (não agrupe várias funcionalidades sem relação).
  - Inclua screenshots ou curl/postman snippets quando possível.
  - Referencie a issue correspondente (ex.: Fixes #12).

## Licença
#### Ainda não há licença explícita no repositório.

## Créditos

  - ###### Função de corte por <a href="https://github.com/dominictobias/react-image-crop/blob/master/src/ReactCrop.tsx">***dominictobias***</a>
