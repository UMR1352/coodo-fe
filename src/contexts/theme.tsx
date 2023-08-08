import { Accessor, createContext, createSignal, useContext } from "solid-js";

type Theme = 'light' | 'dark';

type ThemeContext = {
    theme: Accessor<Theme>,
    toggleTheme: () => void,
}

export const ThemeContext = createContext<ThemeContext>();

export function useThemeContext(): ThemeContext {
    return useContext(ThemeContext);
}

export function ThemeContextProvider(props) {
    const [theme, setTheme] = createSignal<Theme>('light');
    const toggleTheme = () => {
        if (theme() === 'light') setTheme('dark');
        else return setTheme('light');
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {props.children}
        </ThemeContext.Provider>
    );
}