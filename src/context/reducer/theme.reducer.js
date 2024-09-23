import { THEME_TOOGALE } from "../ActionType";



export const ThemeReducer = (state, action) => {
    switch (action.type) {
        case THEME_TOOGALE:
            return {theme : action.payload}
        default:
            return state;
    }
}