import { CreateUserFormData } from '@/core';
import { useAPI } from '@/data/hooks';

export const UserService = () => {

    const { httpPost } = useAPI();

    const createUser = async (data: CreateUserFormData) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { repeatPassword, ...output } = data;
        try {
            const response = await httpPost('/users/register', output);
            return response;
        } catch (error) {
            throw error;
        }
    }

    return { createUser };

};