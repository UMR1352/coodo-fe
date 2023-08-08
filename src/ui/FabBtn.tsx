import clsx from "clsx";
import { useThemeContext } from "../contexts/theme";

export function FabBtn(props) {
    const { theme } = useThemeContext();

    return (
        <div
            class={clsx(
                "flex flex-col justify-center items-center rounded-full w-fit p-2 shadow-md",
                props.class,
                theme() == 'light'
                    ? "bg-purple-500 text-purple-100"
                    : "bg-purple-400 text-black"
            )}
            onClick={props.onClick}
        >
            {props.children}
        </div>
    );
}