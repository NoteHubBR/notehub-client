import {
    AuthService,
    CommentService,
    CommentServiceQueries,
    FlameService,
    FlameServiceQueries,
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
    const flameServiceQueries = FlameServiceQueries();
    const commentService = CommentService();
    const commentServiceQueries = CommentServiceQueries();
    const replyService = ReplyService();
    const sponsorshipService = SponsorshipService();
    return {
        authService,
        userService, userServiceQueries,
        noteService, noteServiceQueries,
        flameService, flameServiceQueries,
        commentService, commentServiceQueries,
        replyService,
        sponsorshipService
    }
}