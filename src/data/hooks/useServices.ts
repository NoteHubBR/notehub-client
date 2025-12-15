import { AuthService, CommentService, FlameService, NoteService, ReplyService, SponsorshipService, UserService } from "@/services";

export const useServices = () => {

    const authService = AuthService();

    const userService = UserService();

    const noteService = NoteService();

    const flameService = FlameService();

    const commentService = CommentService();

    const replyService = ReplyService();

    const sponsorshipService = SponsorshipService();

    return { authService, userService, noteService, flameService, commentService, replyService, sponsorshipService };

}