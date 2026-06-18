import {
    HealthService,
} from "@/services";

export const useServices = () => {
    const healthService = HealthService();
    return {
        healthService,
    }
}