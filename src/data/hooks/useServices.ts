import { AuthService, ChangelogService, CommentService, FlameService, NoteService, ReplyService, UserService } from "@/services";

export const useServices = () => {

    const authService = AuthService();

    const userService = UserService();

    const noteService = NoteService();

    const flameService = FlameService();

    const changelogService = ChangelogService();

    const commentService = CommentService();

    const replyService = ReplyService();

    return { authService, userService, noteService, flameService, changelogService, commentService, replyService };

}