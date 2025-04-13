import { AuthService, FlameService, NoteService, UserService } from "@/services";

export const useServices = () => {

    const authService = AuthService();

    const userService = UserService();

    const noteService = NoteService();

    const flameService = FlameService();

    return { authService, userService, noteService, flameService };

}