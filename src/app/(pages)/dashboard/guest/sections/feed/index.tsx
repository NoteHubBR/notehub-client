import { Article } from "./article";

const getYears = (createdAt: string): string => {
    return `há ${new Date(Date.now() - new Date(createdAt).getTime()).getUTCFullYear() - 1970} anos`;
}

export const Feed = () => (
    <div className="w-full h-full p-4 flex flex-col justify-center">
        <p className="pb-3 font-semibold text-2xl">Feed</p>
        <ul className="flex flex-col gap-3">
            <li>
                <Article
                    photo="/imgs/vasco.png"
                    author="Vasco da Gama"
                    message="criou uma nota"
                    createdAt={getYears("2002-06-22")}
                    title="Navegação"
                    desc="Que sai do oriente e se mostra no ocidente."
                    flamesCount={2002}
                />
            </li>
            <li className="inmd:hidden">
                <Article
                    photo="/imgs/luazul.png"
                    author="Lua Azul"
                    message="criou uma nota"
                    createdAt={getYears("2015-01-01")}
                    title="Venatores"
                    desc="Como iniciar."
                    flamesCount={2015}
                />
            </li>
            <li>
                <Article
                    photo="/imgs/jesus.png"
                    author="Ladrão da noite"
                    message="criou uma nota"
                    createdAt="agora"
                    title="Oriente"
                    flamesCount={2020}
                />
            </li>
        </ul>
    </div>
)