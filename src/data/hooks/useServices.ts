import {
    CommentService,
    CommentServiceQueries,
    HealthService,
    SponsorshipService,
} from "@/services";

export const useServices = () => {
    const healthService = HealthService();
    const commentService = CommentService();
    const commentServiceQueries = CommentServiceQueries();
    const sponsorshipService = SponsorshipService();
    return {
        healthService,
        commentService, commentServiceQueries,
        sponsorshipService
    }
}