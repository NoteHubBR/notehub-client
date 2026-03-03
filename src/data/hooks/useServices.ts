import {
    AuthService,
    CommentService,
    FlameService,
    NoteService,
    NoteServiceQueries,
    ReplyService,
    SponsorshipService,
    UserService,
    UserServiceQueries
} from "@/services";

export const useServices = () => {
    const authService = AuthService();
    const userService = UserService();
    const userServiceQueries = UserServiceQueries();
    const noteService = NoteService();
    const noteServiceQueries = NoteServiceQueries();
    const flameService = FlameService();
    const commentService = CommentService();
    const replyService = ReplyService();
    const sponsorshipService = SponsorshipService();
    return {
        authService,
        userService, userServiceQueries,
        noteService, noteServiceQueries,
        flameService,
        commentService,
        replyService,
        sponsorshipService
    }
}