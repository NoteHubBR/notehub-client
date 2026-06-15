import {
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
} from "@/services";

export const useServices = () => {
    const healthService = HealthService();
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
        feedServiceQueries,
        noteService, noteServiceQueries,
        flameService, flameServiceQueries,
        commentService, commentServiceQueries,
        replyService, replyServiceQueries,
        sponsorshipService
    }
}