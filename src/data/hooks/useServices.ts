import { AuthService, CommentService, FlameService, NoteService, NoteServiceQueries, ReplyService, SponsorshipService, UserService } from "@/services";

export const useServices = () => {

    const authService = AuthService();

    const userService = UserService();

    const noteService = NoteService();

    const noteServiceQueries = NoteServiceQueries();

    const flameService = FlameService();

    const commentService = CommentService();

    const replyService = ReplyService();

    const sponsorshipService = SponsorshipService();

    return { authService, userService, noteService, noteServiceQueries, flameService, commentService, replyService, sponsorshipService };

}