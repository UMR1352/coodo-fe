export const useWs = () => {
    const protocol = window.location.protocol == "https:" ? "wss" : "ws";
    const isDev = import.meta.env.DEV;
    const basePath = isDev ? window.location.host : "emarconi.xyz/coodo";

    return {
        connect: (todoListId: string) => new WebSocket(`${protocol}://${basePath}/ws/${todoListId}`),
    }
}