import { Feed } from "./feed";
import { Notifications } from "./notifications";
import { Profile } from "./profile";

export const sections = [
    {
        flip: true,
        title: "Destaque-se com seu perfil",
        subtitle: "Personalize-o à sua maneira!",
        message: "Iniciar",
        child: <Profile />
    },
    {
        flip: false,
        title: "Junte-se à comunidade",
        subtitle: "Conecte-se com outros e fique por dentro.",
        message: "Participar",
        child: <Feed />
    },
    {
        flip: true,
        title: "Mantenha a comunicação",
        subtitle: "Receba atualizações de suas interações na comunidade.",
        message: "Interagir",
        child: <Notifications />
    }
]