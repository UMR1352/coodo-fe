export const get = async (path: string) => {
    const url = "/api" + path;

    return fetch(url, {
        method: "GET",
        credentials: "include",
    });
}

export const post = async (path: string, body?: any) => {
    const url = "/api" + path;

    return fetch(url, {
        method: "POST",
        credentials: "include",
        body: body ?? {},
    });
}
