import { Article } from "./article";
import { IconFlame, IconMessageUser, IconUserPlus } from "@tabler/icons-react";

const getYears = (createdAt: string): string => {
    return `há ${new Date(Date.now() - new Date(createdAt).getTime()).getUTCFullYear() - 1970} anos`;
}

export const Notifications = () => (
    <div className="w-full h-full p-4 flex flex-col justify-center">
        <p className="pb-3 font-semibold text-2xl">Notificações</p>
        <ul>
            <Article
                emote={IconMessageUser}
                photo="/imgs/vasco.png"
                sender="vascodagama"
                message="respondeu você: 7x0"
                date="01/01/2015 01:01"
                createdAt={getYears("2002-06-12")}
            />
            <Article
                emote={IconFlame}
                photo="/imgs/luazul.png"
                sender="luazul"
                message="inflamou sua nota: ab chao"
                date="01/01/2015 01:01"
                createdAt={getYears("2015-01-01")}
            />
            <Article
                emote={IconUserPlus}
                photo="/imgs/jesus.png"
                sender="morningstar"
                message="está seguindo você."
                date="agora"
                createdAt="agora"
            />
        </ul>
    </div>
)