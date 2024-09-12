import { useContext } from "react";
import { themeReducer } from "./reducer/theme.reducer";


export const ThemeContext = useContext();

const initialState = {
    theme:'light'
}

const [state, dispatch] = useReducer(themeReducer , initialState);


export const themeProvider = () => {

}