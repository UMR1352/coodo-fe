import { Accessor, createContext, createSignal, onCleanup, useContext } from "solid-js";
import { TodoList, TodoListValidator } from "../types/todo";
import { useWs } from "../ws";
import { useParams } from "@solidjs/router";
import { User } from "./session";

type TodoContext = {
    todo: Accessor<TodoList | undefined>,
    renameList: (newName: string) => void,
    addTask: () => void,
    setTaskName: (id: string, name: string) => void,
    setTaskAssignee: (id: string, user: User) => void,
    setTaskDone: (id: string, value: boolean) => void,
}

export const TodoContext = createContext<TodoContext>();

export function useTodoContext(): TodoContext {
    const ctx = useContext(TodoContext);
    if (ctx == undefined) {
        throw new Error("`useTodoContext` can only be called inside a TodoContextProvider");
    } else {
        return ctx;
    }
}

export function TodoContextProvider(props: {children: any}) {
    const [todo, setTodo] = createSignal<TodoList | undefined>();
    const { connect } = useWs();
    const params = useParams();
    const ws = connect(params.id);
    setupWs(ws, setTodo);
    const ctx = {
        todo,
        renameList: (newName: string) => ws.send(JSON.stringify({type: "set_list_name", data: newName})),
        addTask: () => ws.send(JSON.stringify({type: "create_task"})),
        setTaskName: (id: string, name: string) => {
            ws.send(JSON.stringify({type: "task_command", data: {task: id, action: "rename", data: name}}));
        },
        setTaskAssignee: (id: string, user: User) => {
            ws.send(JSON.stringify({type: "task_command", data: {task: id, action: "set_assignee", data: user}}));
        },
        setTaskDone: (id: string, done: boolean) => {
            ws.send(JSON.stringify({type: "task_command", data: {task: id, action: "set_done", data: done}}));
        },
    };
    
    onCleanup(() => ws.close());

    return (
        <TodoContext.Provider value={ctx}>
            {props.children}
        </TodoContext.Provider>
    );
}

function setupWs(ws: WebSocket, todoSetter: (todo: TodoList) => void) {
    ws.onmessage = msg => {
        console.debug("[WS] Got message!");
        try {
            const todo = TodoListValidator.parse(JSON.parse(msg.data));
            todoSetter(todo);
        } catch (e) {
            console.debug("[WS] error: " + e);
        }
    };
    ws.onopen = () => console.log("[WS] Connected!");
    ws.onclose = () => console.log("[WS] Disconnected!");
}