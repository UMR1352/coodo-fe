import clsx from "clsx";
import { useThemeContext } from "../contexts/theme";
import { Match, Switch } from "solid-js";
import { A } from "@solidjs/router";

export function Link(props) {
    const { theme } = useThemeContext();

    return (
        <Switch>
            <Match when={props.external}>
                <a
                    class={clsx(
                        "text-xl font-bold cursor-pointer",
                        theme() == 'light'
                            ? "text-purple-500"
                            : "text-purple-400"
                    )}
                    href={props.href}
                    target="_blank"
                >
                    {props.children}
                </a>
            </Match>
            <Match when={!props.external}>
                <A
                    class={clsx(
                        "text-xl font-bold cursor-pointer",
                        theme() == 'light'
                            ? "text-purple-500"
                            : "text-purple-400"
                    )}
                    href={props.href}
                >
                    {props.children}
                </A>
            </Match>
        </Switch>
    );
}