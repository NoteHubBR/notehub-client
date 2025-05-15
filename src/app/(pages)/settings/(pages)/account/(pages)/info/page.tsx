'use client';

import { Header } from "../../../Header";
import { toSpecificTime } from "@/core";
import { useUser } from "@/data/hooks";

const Page = () => {

  const { user } = useUser();

  const Desc = ({ term, desc }: { term: string; desc: string; }) => (
    <>
      <dt>{term}</dt>
      <dd className="-mt-5 text-sm dark:text-midlight/60 text-middark/60">{desc}</dd>
    </>
  )

  if (user) return (
    <section>
      <Header goBack="/settings/account" title="Informações" />
      <dl className="mt-6 flex flex-col gap-5">
        <Desc term="Host" desc={user.host} />
        <Desc term="Perfil" desc={user.profile_private ? "Privado" : "Público"} />
        <Desc term="Patrocinador" desc={user.sponsor ? "Sim" : "Não"} />
        <Desc term="Email" desc={user.email} />
        <Desc term="Usuário" desc={`@${user.username}`} />
        <Desc term="Nome" desc={user.display_name} />
        <Desc term="Criação" desc={toSpecificTime(user.created_at)} />
        <Desc term="Mensagem" desc={user.message} />
      </dl>
    </section>
  )

}

export default Page;