import { Article } from "./article";

export const Feed = () => (
    <div className="p-4">
        <p className="pb-3 font-semibold text-2xl">Feed</p>
        <ul className="flex flex-col gap-3">
            <li>
                <Article
                    photo="/imgs/avatar.png"
                    author="Vasco da Gama"
                    message="criou uma nota"
                    createdAt="há 1 semana"
                    title="Maior do Rio"
                    desc="Gigante da colina."
                    flamesCount={1898}
                />
            </li>
            <li>
                <Article
                    photo="/imgs/avatar.png"
                    author="Vasco da Gama"
                    message="criou uma nota"
                    createdAt="há 1 semana"
                    title="Maior do Rio"
                    desc="Gigante da colina."
                    flamesCount={1898}
                />
            </li>
            <li>
                <Article
                    photo="/imgs/avatar.png"
                    author="Vasco da Gama"
                    message="criou uma nota"
                    createdAt="há 1 semana"
                    title="Maior do Rio"
                    desc="Gigante da colina."
                    flamesCount={1898}
                />
            </li>
        </ul>
    </div>
)