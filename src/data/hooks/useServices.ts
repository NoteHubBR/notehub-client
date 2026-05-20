import {
    AuthService,
    CommentService,
    CommentServiceQueries,
    FeedServiceQueries,
    FlameService,
    FlameServiceQueries,
    HealthService,
    NoteService,
    NoteServiceQueries,
    ReplyService,
    ReplyServiceQueries,
    SponsorshipService,
    UserService,
    UserServiceQueries
} from "@/services";

export const useServices = () => {
    const healthService = HealthService();
    const authService = AuthService();
    const userService = UserService();
    const userServiceQueries = UserServiceQueries();
    const feedServiceQueries = FeedServiceQueries();
    const noteService = NoteService();
    const noteServiceQueries = NoteServiceQueries();
    const flameService = FlameService();
    const flameServiceQueries = FlameServiceQueries();
    const commentService = CommentService();
    const commentServiceQueries = CommentServiceQueries();
    const replyService = ReplyService();
    const replyServiceQueries = ReplyServiceQueries();
    const sponsorshipService = SponsorshipService();
    return {
        healthService,
        authService,
        userService, userServiceQueries,
        feedServiceQueries,
        noteService, noteServiceQueries,
        flameService, flameServiceQueries,
        commentService, commentServiceQueries,
        replyService, replyServiceQueries,
        sponsorshipService
    }
}