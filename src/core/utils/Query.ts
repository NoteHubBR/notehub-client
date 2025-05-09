export const buildQueryStrings = (
    searchParams: URLSearchParams,
    router?: { replace: (url: string) => void },
    keys: string[] = ['q', 'type', 'tag', 'order', 'sort', 'page']
): string => {

    const params: Record<string, string> = {};

    keys.forEach(key => {
        const value = searchParams.get(key);
        if (value) params[key] = value;
    })

    if (router) {
        const newQuery = `?${new URLSearchParams(params)}`;
        if (newQuery !== window.location.search) router.replace(newQuery);
    }

    const searchQuery = new URLSearchParams();
    if (params.q) searchQuery.set('q', params.q);
    if (params.type) searchQuery.set('type', params.type);
    if (params.tag) searchQuery.set('tag', params.tag);
    if (params.order) searchQuery.set('sort', `${params.order},${params.sort ?? 'desc'}`);
    if (params.sort) searchQuery.set('sort', `${params.order ?? 'modifiedAt'},${params.sort}`);
    if (params.page) searchQuery.set('page', String(Number(params.page) - 1));
    if (params.type === "users" && params.order === "relevant") searchQuery.set('sort', 'followersCount,desc');
    if (params.type === "notes" && params.order === "relevant") searchQuery.set('sort', 'flamesCount,desc');
    if (params.type === "tags" && params.order === "relevant") searchQuery.set('sort', 'flamesCount,desc');
    if (params.type === undefined && params.order === "relevant") searchQuery.set('sort', 'flamesCount,desc');

    return String(searchQuery);

}