


export const themeReducer = (state, action) => {
    switch (action.type) {
        case THEME_TOGGAL:
            return state.theme = action.paylod
        default:
            return state;
    }
}