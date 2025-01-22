import { AuthService, NoteService, UserService } from "@/services";

export const useServices = () => {

    const authService = AuthService();

    const userService = UserService();

    const noteService = NoteService();

    return { authService, userService, noteService };

}