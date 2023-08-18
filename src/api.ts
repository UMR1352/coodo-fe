const makeUrl = (path: string): string => {
    const basePath = import.meta.env.DEV ? "/api" : `${import.meta.env.BASE_URL.slice(0, -1)}/api`; 
    return basePath + path;
}

export const get = async (path: string) => {
    const url = makeUrl(path);

    return fetch(url, {
        method: "GET",
        credentials: "include",
        cache: "no-store"
    });
}

export const post = async (path: string, body?: any) => {
    const url = makeUrl(path);

    return fetch(url, {
        method: "POST",
        credentials: "include",
        body: body ?? {},
        cache: "no-store"
    });
}
