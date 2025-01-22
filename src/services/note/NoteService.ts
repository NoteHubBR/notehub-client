import { LowDetailNote, Page } from "@/core";
import { useAPI } from "@/data/hooks";
import { AuthService } from "../auth";

export const NoteService = () => {

    const { httpGet } = useAPI();

    const handleExpiredToken = AuthService().handleExpiredToken;

    const getUserNotes = async (token: string): Promise<Page<LowDetailNote>> => {
        const endpoint: string = '/notes/private?size=9999&sort=createdAt,desc';
        try {
            return await httpGet(endpoint, { useToken: token });
        } catch (error: any) {
            return handleExpiredToken(error, (newToken) => httpGet(endpoint, { useToken: newToken }));
        }
    }

    return { getUserNotes }

}