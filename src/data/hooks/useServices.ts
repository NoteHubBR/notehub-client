import {
    HealthService,
    SponsorshipService,
} from "@/services";

export const useServices = () => {
    const healthService = HealthService();
    const sponsorshipService = SponsorshipService();
    return {
        healthService,
        sponsorshipService
    }
}