import { post } from "../api";
import { Index, Show, createEffect, createSignal } from "solid-js";
import { Card } from "../ui/Card";
import { TodoTask } from "../ui/TodoTask";
import { FabBtn } from "../ui/FabBtn";
import { CopyIcon, ListTodoIcon, PlusIcon } from "../ui/icons";
import { useTodoContext } from "../contexts/todoList";
import { TextInput } from "../ui/Input";
import { useThemeContext } from "../contexts/theme";
import clsx from "clsx";
import { useSessionContext } from "../contexts/session";

export function TodoPage() {
    const { todo, setTaskAssignee, setTaskDone, setTaskName, addTask, renameList } = useTodoContext();
    const { session } = useSessionContext();
    const [todoName, setTodoName] = createSignal(todo()?.name || "Unnamed TodoList");
    const [copied, setCopied] = createSignal<boolean>(false);
    const { theme } = useThemeContext();
    let todoNameRef: Element | null;

    const copyToClipboard = () => {
        const text = window.location.hostname + window.location.pathname;
        navigator.clipboard.writeText(text);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    }

    createEffect(() => {
        const name = todo()?.name || "Unnamed TodoList";
        const isTodoNameFocused = todoNameRef == document.activeElement;
        if (!isTodoNameFocused) setTodoName(name);
    })

    return (
        <div class="relative w-full h-full">
            <div class="w-full py-4 px-4">
                <div class="w-full flex space-x-4">
                    <TextInput
                        class={clsx(
                            "text-2xl font-bold mb-1 w-full",
                            theme() == 'light' ? "!text-purple-500" : "!text-purple-400"
                        )}
                        value={todoName()}
                        onChange={e => setTodoName(e.target.value)}
                        onFocusOut={() => todoName() != todo()?.name && renameList(todoName())}
                    />
                    <div class="relative">
                        <CopyIcon
                            class={clsx(
                                "w-8 h-8 cursor-pointer sm:hover:-rotate-12",
                                theme() == 'light' ? "text-purple-500" : "text-purple-400"
                            )}
                            onClick={copyToClipboard}
                        />
                        <Show when={copied()}>
                            <Card class="absolute right-0 -bottom-16 text-center w-32 z-20">
                                TodoList's link copied!
                            </Card>
                        </Show>
                    </div>
                </div>
                <Card class="p-0">
                    <Show when={(todo()?.tasks ?? []).length == 0}>
                        <div class="w-full flex flex-col items-center">
                            <ListTodoIcon class="w-24 h-24 text-purple-400 animate-pulse" />
                            <h3 class="text-lg text-center">
                                So empty! Why don't you add some tasks?
                            </h3>
                        </div>
                    </Show>
                    <Index each={todo()?.tasks ?? []}>
                        {(task, i) => (
                            <TodoTask
                                task={task()}
                                data-index={i}
                                isMe={task()?.assignee == session()}
                                users={todo()?.connectedUsers ?? []}
                                setDone={v => setTaskDone(task().id, v)}
                                rename={name => setTaskName(task().id, name)}
                                assign={user => user != task()?.assignee && setTaskAssignee(task().id, user)}
                            />
                        )}
                    </Index>
                </Card>
            </div>
            <FabBtn
                class="absolute bottom-4 right-4 !w-12 h-12"
                onClick={addTask}
            >
                <PlusIcon />
            </FabBtn>
        </div>
    );
}