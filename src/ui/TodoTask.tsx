import { createEffect, createSignal } from "solid-js";
import { Task } from "../types/todo";
import { CheckBox } from "./CheckBox";
import { TextInput } from "./Input";
import { UserAvatar } from "./UserAvatar";
import { User } from "../contexts/session";

type TodoTaskProps = {
    task: Task,
    users: User[],
    isMe: boolean,
    setDone: (v: boolean) => void,
    rename: (name: string) => void,
    assign: (user: string) => void,
}

export function TodoTask(props: TodoTaskProps) {
    const [taskName, setTaskName] = createSignal<string>(props.task.name || "Unnamed Task");
    let taskNameRef;

    createEffect(() => {
        const isTaskNameInputFocused = taskNameRef == document.activeElement;
        !isTaskNameInputFocused && setTaskName(props.task.name)
    })

    return (
        <div class="w-full flex justify-between items-center shadow-sm p-2">
            <div class="flex grow min-w-0 space-x-4">
                <div class="flex flex-col justify-center">
                    <CheckBox
                        checked={props.task.done}
                        onChange={e => props.setDone(e.target.checked)}
                    />
                </div>
                <TextInput
                    class="text-xl mt-1 truncate"
                    ref={taskNameRef}
                    value={props.task.name || "Unnamed Task"}
                    onChange={e => setTaskName(e.target.value)}
                    onFocusOut={() => taskName() != props.task.name && props.rename(taskName())}
                />
            </div>
            <UserAvatar userHandle={props.users.find(u => u.id == props.task.assignee)?.handle} />
        </div>
    );
}