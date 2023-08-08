import { useNavigate } from "@solidjs/router";
import { useThemeContext } from "../contexts/theme";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { HandShakeIcon, SunIcon } from "./icons";
import clsx from "clsx";

export function Layout(props) {
    const { theme } = useThemeContext();
    const navigate = useNavigate();

    return (
        <div class="flex flex-col w-full h-full">
            <div
                class={clsx("z-10 h-16 flex w-full items-center justify-between items-center px-4 shadow-lg",
                    theme() == 'light' ? "bg-purple-400 text-white" : "bg-zinc-800 text-purple-400"
                )}
            >
                <HandShakeIcon
                    class="cursor-pointer h-12 w-12"
                    onClick={() => navigate("/")}
                />
                <h1 class="text-4xl pt-2 font-mono">./Coodo</h1>
                <ThemeSwitcher />
            </div>
            <div class={clsx("flex flex-col grow min-h-0 overflow-y-auto", theme() == 'light' ? "bg-purple-50 text-black" : "bg-neutral-900 text-purple-200")}>
                {props.children}
            </div>
            <h3
                class={clsx("text-center text-small pb-2 ", theme() == 'light' ? "bg-purple-50 text-slate-500" : "bg-neutral-900 text-purple-300")}>
                Made with ❤️, Solid.js and Tailwind
            </h3>
        </div>
    );
}