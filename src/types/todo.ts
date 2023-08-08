import { z } from "zod";
import { SessionValidator } from "../contexts/session";

export type TodoListInfo = {
    id: string,
    name: string,
}

const TaskValidator = z.object({
    id: z.string().uuid(),
    name: z.string(),
    done: z.coerce.boolean(),
    assignee: z.string().uuid(),
});

export type Task = z.infer<typeof TaskValidator>;

export const TodoListValidator = z.object({
    id: z.string().uuid(),
    name: z.string(),
    connectedUsers: SessionValidator.array(),
    createdAt: z.coerce.date(),
    lastUpdatedAt: z.coerce.date(),
    tasks: TaskValidator.array(),
});

export type TodoList = z.infer<typeof TodoListValidator>;