import { AuthService } from "../auth";
import { DonationFormData } from "@/core";
import { useAPI } from "@/data/hooks";
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
    status: string
    amountTotal: number;
}

export const SponsorshipService = () => {

    const { httpPost, httpGet } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

    const buySponsorship = async (token: string, data: DonationFormData): Promise<SponsorshipPurchaseReturn> => {
        const endpoint: string = '/payment/stripe/sponsorship';
        try {
            return await httpPost(endpoint, data, { useProgress: true, useToken: token });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpPost(endpoint, data, { useProgress: true, useToken: newToken }));
        }
    }

    const verifyPaymentStatus = async (token: string, sessionId: string): Promise<PurchaseStatusReturn> => {
        const endpoint: string = `/payment/stripe/sponsorship/verify/${sessionId}`;
        try {
            return await httpGet(endpoint, { useProgress: true, useToken: token });
        } catch (error) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useProgress: true, useToken: newToken }));
        }
    }

    return { buySponsorship, verifyPaymentStatus };

}