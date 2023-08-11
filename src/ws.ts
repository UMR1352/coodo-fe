export const useWs = () => {
    const protocol = window.location.protocol == "https:" ? "wss" : "ws";
    const host = window.location.host;

    return {
        connect: (todoListId: string) => new WebSocket(`${protocol}://${host}/ws/${todoListId}`),
    }
}