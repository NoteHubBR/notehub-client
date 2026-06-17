import {
    CommentService,
    CommentServiceQueries,
    HealthService,
    ReplyService,
    ReplyServiceQueries,
    SponsorshipService,
} from "@/services";

export const useServices = () => {
    const healthService = HealthService();
    const commentService = CommentService();
    const commentServiceQueries = CommentServiceQueries();
    const replyService = ReplyService();
    const replyServiceQueries = ReplyServiceQueries();
    const sponsorshipService = SponsorshipService();
    return {
        healthService,
        commentService, commentServiceQueries,
        replyService, replyServiceQueries,
        sponsorshipService
    }
}