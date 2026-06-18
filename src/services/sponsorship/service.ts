import { ApiClient } from '@/api';
import { createAuthService } from "../auth";
import { DonationFormData, Token } from "@/core";
import { UUID } from 'crypto';

type SponsorshipPurchaseReturn = {
    status: string;
    message: string;
    sessionId: string;
    sessionUrl: string;
    uId: UUID;
}

type PurchaseStatusReturn = {
    sessionId: string;
    paymentStatus: string;
    status: string;
    locale: string;
    currency: string;
    amountTotal: number;
}

export const createSponsorshipService = (api: ApiClient, updateToken: (token: Token) => void) => {

    const { withRetry } = createAuthService(api, updateToken);

    const buySponsorship = async (token: string, data: DonationFormData): Promise<SponsorshipPurchaseReturn> => {
        const endpoint: string = '/payment/stripe/sponsorship';
        return withRetry(token, (token) => api.post(endpoint, data, { token: token }));
    }

    const verifyPaymentStatus = async (token: string, sessionId: string): Promise<PurchaseStatusReturn> => {
        const endpoint: string = `/payment/stripe/sponsorship/verify/${sessionId}`;
        return withRetry(token, (token) => api.post(endpoint, { token: token }));
    }

    return { buySponsorship, verifyPaymentStatus };

}