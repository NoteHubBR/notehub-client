import { UserService } from "@/services";

export const useServices = () => {

    const userService = UserService();

    return { userService };

}