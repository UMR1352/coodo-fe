export const useWs = () => {
    const protocol = window.location.protocol == "https:" ? "wss" : "ws";

    return {
        connect: (todoListId: string) => new WebSocket(`${protocol}://localhost:8080/todos/${todoListId}`),
    }
}