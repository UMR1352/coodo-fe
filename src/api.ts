export const get = async (path: string) => {
    const url = "/api" + path;

    return fetch(url, {
        method: "GET",
        credentials: "include",
        cache: "no-store"
    });
}

export const post = async (path: string, body?: any) => {
    const url = "/api" + path;

    return fetch(url, {
        method: "POST",
        credentials: "include",
        body: body ?? {},
        cache: "no-store"
    });
}
