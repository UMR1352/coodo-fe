import { For, Match, Show, Switch, createResource } from 'solid-js';
import { useSessionContext } from '../contexts/session';
import { get } from '../api';
import { JoinIcon, PlusIcon } from "../ui/icons";
import { TodoListInfo } from '../types/todo';
import { Card } from '../ui/Card';
import { FabBtn } from '../ui/FabBtn';
import { Link } from '../ui/Link';
import { useNavigate } from '@solidjs/router';

export default function Home() {
  const { session } = useSessionContext();
  const navigate = useNavigate();
  const [todos] = createResource(getTodos);
  const animalName = () => session().handle.split("-")[2];

  return (
    <div class="relative w-full h-full p-10 flex flex-col items-center break-words space-y-10">
      <div class="w-full items-center text-center space-y-4">
        <h1 class="text-5xl">Welcome to Coodo!</h1>
        <Show when={session()}>
          <h3 class="text-xl">
            <span>Your user handle for this session is </span>
            <Link
              external
              href={`https://wikipedia.org/wiki/${animalName()}`}
            >
              {session().handle}
            </Link>
            <span>. Hope you like it! </span>
          </h3>
        </Show>
      </div>
      <Switch>
        <Match when={(todos() ?? []).length == 0}>
          <div class="w-full items-center text-center space-y-4">
            <h1 class="text-5xl">{":("}</h1>
            <h3 class="text-xl">
              It seems you haven't joined any TodoList yet.. <br />
              Create a new TodoList or join one through an invite link!
            </h3>
          </div>
        </Match>
        <Match when={todos().length > 0}>
          <div class="w-full flex flex-col items-center">
            <div class="w-full sm:w-1/2">
              <h3 class="text-2xl">Your TodoLists:</h3>
              <Card>
                <ul class="list-disc list-inside ml-1">
                  <For each={todos()}>
                    {todoList => (
                      <li class="truncate">
                        <Link
                          href={`/todos/${todoList.id}`}
                        >
                          {todoList.name || "Unnamed TodoList"}
                        </Link>
                      </li>
                    )}
                  </For>
                </ul>
              </Card>
            </div>
          </div>
        </Match>
      </Switch>
      <div class="w-full flex justify-end">
        <FabBtn
          class="!w-12 h-12"
          onClick={() => navigate("/todos/")}
        >
          <PlusIcon />
        </FabBtn>
      </div>
    </div>
  );
}

async function getTodos(): Promise<TodoListInfo[]> {
  return get("/todos")
    .then(res => res.json())
    .catch(_ => []);
}