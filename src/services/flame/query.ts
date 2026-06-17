import { FlameService } from './service';
import { useGuardedQuery } from '../utils';

export const createFlameQuery = (service: FlameService) => {

    const useSearchUserFlames = (token: string | null, username: string, parameters?: string, enabled: boolean = true) => {
        return useGuardedQuery({
            keys: ['flames', token, username, parameters],
            function: () => service.searchUserFlames(token, username, parameters),
            enabled: enabled
        })
    }

    return { useSearchUserFlames };

}