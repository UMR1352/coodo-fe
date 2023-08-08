import clsx from "clsx";
import { useThemeContext } from "../contexts/theme";

export function Card(props) {
    const { theme } = useThemeContext();

    return (
        <div class={clsx(
            "w-full rounded shadow-md p-2",
            theme() == 'light'
                ? "bg-white"
                : "bg-zinc-800",
            props.class
        )}>
            {props.children}
        </div>
    );
}