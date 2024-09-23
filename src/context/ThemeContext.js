import { createContext, useReducer } from "react";
import { ThemeReducer } from "./reducer/theme.reducer";
import { THEME_TOOGALE } from "./ActionType";


export const ThemeContext = createContext();

const initialState = {
    theme: 'light'
}



export const ThemeProvider = ({ children }) => {
    const [state, dispatch] = useReducer(ThemeReducer, initialState);

    const toogaleTheme = () => {
        const ans = state.theme === 'light' ? 'dark' : 'light'

        dispatch({ type: THEME_TOOGALE, payload: ans })
    }

    return (
        <ThemeContext.Provider
            value={{
                ...state,
                toogaleTheme
            }}
        >
            {children}
        </ThemeContext.Provider>
    )
}