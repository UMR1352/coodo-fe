import { post } from "../api";
import { Index, Show, createEffect, createSignal } from "solid-js";
import { Card } from "../ui/Card";
import { TodoTask } from "../ui/TodoTask";
import { FabBtn } from "../ui/FabBtn";
import { ListTodoIcon, PlusIcon } from "../ui/icons";
import { useTodoContext } from "../contexts/todoList";
import { TextInput } from "../ui/Input";
import { useThemeContext } from "../contexts/theme";
import clsx from "clsx";
import { useSessionContext } from "../contexts/session";
import { Outlet } from "@solidjs/router";

export function TodoPage() {
    const { todo, setTaskAssignee, setTaskDone, setTaskName, addTask, renameList } = useTodoContext();
    const { session } = useSessionContext();
    const [todoName, setTodoName] = createSignal(todo()?.name || "Unnamed TodoList");
    const { theme } = useThemeContext();
    let todoNameRef;

    createEffect(() => {
        const name = todo()?.name || "Unnamed TodoList";
        const isTodoNameFocused = todoNameRef == document.activeElement;
        if (!isTodoNameFocused) setTodoName(name);
    })

    return (
        <div class="relative w-full h-full">
            <div class="w-full py-4 px-4">
                <TextInput
                    class={clsx(
                        "text-2xl font-bold mb-1",
                        theme() == 'light' ? "!text-purple-500" : "!text-purple-400"
                    )}
                    value={todoName()}
                    onChange={e => setTodoName(e.target.value)}
                    onFocusOut={() => todoName() != todo().name && renameList(todoName())}
                />
                <Card class="p-0">
                    {/* <Show when={(todo()?.tasks ?? []).length == 0}>
                        <div class="w-full flex flex-col items-center">
                            <ListTodoIcon class="w-24 h-24 text-purple-400 animate-pulse" />
                            <h3 class="text-lg text-center">
                                So empty! Why don't you add some tasks?
                            </h3>
                        </div>
                    </Show> */}
                    <Index each={todo()?.tasks ?? []}>
                        {(task, i) => (
                            <TodoTask
                                task={task()}
                                data-index={i}
                                isMe={task().assignee == session().id}
                                users={todo().connectedUsers}
                                setDone={v => setTaskDone(task().id, v)}
                                rename={name => setTaskName(task().id, name)}
                                assign={(v) => { }}
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

const createNewTodoList = async (): Promise<string> => {
    return post("/todos")
        .then(res => res.json());
}