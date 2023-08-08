import clsx from "clsx";
import { CheckIcon } from "./icons";
import { useThemeContext } from "../contexts/theme";

export function CheckBox(props) {
    const { theme } = useThemeContext();

    return (
        <div class="flex gap-2">
            <input
                class={clsx(
                    "appearance-none relative peer shrink-0 w-6 h-6 rounded border-2 bg-transparent",
                    theme() == 'light'
                        ? "checked:border-purple-500 border-gray-500"
                        : "border-purple-400 checked:bg-purple-400",
                )}
                type="checkbox"
                onChange={props.onChange}
                checked={props.checked}
            />
            <CheckIcon 
                class={clsx(
                    "absolute w-6 h-6 hidden peer-checked:block pointer-events-none",
                    theme() == 'light'
                        ? "text-purple-500"
                        : "text-black"
                )}
            />
        </div>
    );
}