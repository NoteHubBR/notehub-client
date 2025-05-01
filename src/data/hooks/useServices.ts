import { AuthService, ChangelogService, FlameService, NoteService, UserService } from "@/services";

export const useServices = () => {

    const authService = AuthService();

    const userService = UserService();

    const noteService = NoteService();

    const flameService = FlameService();

    const changelogService = ChangelogService();

    return { authService, userService, noteService, flameService, changelogService };

}