import { For, Show, createEffect, createMemo, createSignal, onCleanup, onMount } from "solid-js";
import { Task } from "../types/todo";
import { CheckBox } from "./CheckBox";
import { TextInput } from "./Input";
import { UserAvatar } from "./UserAvatar";
import { User, useSessionContext } from "../contexts/session";
import clsx from "clsx";
import { useThemeContext } from "../contexts/theme";
import { PencilIcon } from "./icons";

type TodoTaskProps = {
    task: Task,
    users: User[],
    isMe: boolean,
    setDone: (v: boolean) => void,
    rename: (name: string) => void,
    assign: (user: User) => void,
}

export function TodoTask(props: TodoTaskProps) {
    const [taskName, setTaskName] = createSignal<string>(props.task.name || "Unnamed Task");
    const [isDropdownActive, setIsDropDownActive] = createSignal<boolean>(false);
    const assignee = createMemo(() => props.task.assignee);
    const { theme } = useThemeContext();
    const { session } = useSessionContext();
    let taskNameRef: Element | null = null;

    createEffect(() => {
        const isTaskNameInputFocused = taskNameRef == document.activeElement;
        !isTaskNameInputFocused && setTaskName(props.task.name);
    })

    return (
        <div class={clsx(
            "w-full flex justify-between items-center px-2 pb-2 last:pb-0",
            "pt-2 first:pt-0 border-b-2 last:border-none",
            theme() == 'light' ? "border-zinc-100" : "border-zinc-700"
        )}>
            <div class="flex grow min-w-0 space-x-4 pr-4">
                <div class="flex flex-col justify-center">
                    <CheckBox
                        checked={props.task.done}
                        onChange={e => props.setDone(e.target.checked)}
                    />
                </div>
                <TextInput
                    class="text-xl mt-1 truncate w-full"
                    ref={taskNameRef}
                    value={props.task.name || "Unnamed Task"}
                    onChange={e => setTaskName(e.target.value)}
                    onFocusOut={() => taskName() != props.task.name && props.rename(taskName())}
                />
            </div>
            <div
                class="relative flex items-center space-x-2 cursor-pointer"
                onClick={e => { console.log("open drop " + isDropdownActive()); setIsDropDownActive(!isDropdownActive()); e.preventDefault();} }
            >
                <UserAvatar
                    userHandle={assignee().handle}
                    isMe={session().id == assignee().id}
                />
                <PencilIcon
                    class={clsx(
                        "font-normal",
                        theme() == 'light' ? "text-purple-500" : "text-purple-400"
                    )}
                />
                <AssigneeDropDown
                    users={props.users}
                    active={isDropdownActive()}
                    setAssignee={(user: User) => assignee().id != user.id && props.assign(user)}
                    onClose={() => setIsDropDownActive(false)}
                />
            </div>
        </div>
    );
}

type AssigneeDropDownProps = {
    users: User[],
    active: boolean,
    setAssignee: (user: User) => void,
    onClose: () => void,
}

function AssigneeDropDown(props: AssigneeDropDownProps) {
    const { theme } = useThemeContext();
    const { session } = useSessionContext();
    let ref: HTMLDivElement| undefined;
    const onClickOutside = e => {!ref?.contains(e.target) && props.onClose(); console.log("on close")};

    createEffect(() => {
        if (props.active) {
            document.addEventListener("click", onClickOutside);
        } else {
            document.removeEventListener("click", onClickOutside);
        }
    })

    return (
        <Show when={props.active}>
            <div
                ref={ref}
                class={clsx(
                "absolute flex flex-col grow bg-white -right-4 -bottom-32 z-10 rounded w-80 shadow-lg",
                theme() == 'light' ? 'bg-white' : 'bg-zinc-800',
            )}>
                <For each={props.users}>
                    {(user, i) => (
                        <div
                            class={clsx(
                                theme() == 'light' 
                                    ? "border-zinc-100 hover:bg-zinc-100" 
                                    : "border-zinc-700 hover:bg-zinc-700",
                                "w-full flex items-center space-x-4 py-2 px-4 text-xl",
                                "border-b-2 last:border-b-0"
                            )}
                            data-index={i()}
                            onClick={() => {
                                props.setAssignee(user);
                                props.onClose();
                            }}
                        >
                            <div class="block w-10 h-fit">
                                <UserAvatar
                                    class="text-sm"
                                    userHandle={user.handle}
                                    isMe={session().id == user.id}
                                />
                            </div>
                            <span class="truncate">{user.handle}</span>
                        </div>
                    )}
                </For>
            </div>
        </Show>
    );
}