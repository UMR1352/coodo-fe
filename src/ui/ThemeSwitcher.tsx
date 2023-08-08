import { Match, Switch } from "solid-js";
import { useThemeContext } from "../contexts/theme";
import { MoonIcon, SunIcon } from "./icons";

export function ThemeSwitcher() {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <Switch>
            <Match when={theme() == 'light'}>
                <SunIcon
                    class="text-white cursor-pointer w-12 h-12"
                    onClick={() => toggleTheme()}
                />
            </Match>
            <Match when={theme() == 'dark'}>
                <MoonIcon
                    class="text-purple-400 cursor-pointer w-12 h-12"
                    onClick={() => toggleTheme()}
                />
            </Match>
        </Switch>
    );
}