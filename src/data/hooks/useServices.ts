import {
    CommentService,
    CommentServiceQueries,
    FeedServiceQueries,
    HealthService,
    ReplyService,
    ReplyServiceQueries,
    SponsorshipService,
} from "@/services";

export const useServices = () => {
    const healthService = HealthService();
    const feedServiceQueries = FeedServiceQueries();
    const commentService = CommentService();
    const commentServiceQueries = CommentServiceQueries();
    const replyService = ReplyService();
    const replyServiceQueries = ReplyServiceQueries();
    const sponsorshipService = SponsorshipService();
    return {
        healthService,
        feedServiceQueries,
        commentService, commentServiceQueries,
        replyService, replyServiceQueries,
        sponsorshipService
    }
}