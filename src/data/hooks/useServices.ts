import { AuthService, ChangelogService, CommentService, FlameService, NoteService, UserService } from "@/services";

export const useServices = () => {

    const authService = AuthService();

    const userService = UserService();

    const noteService = NoteService();

    const flameService = FlameService();

    const changelogService = ChangelogService();

    const commentService = CommentService();

    return { authService, userService, noteService, flameService, changelogService, commentService };

}