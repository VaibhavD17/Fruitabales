import { ADD_SUBCATEGORY, DELETE_SUBCATEGORY, EDIT_SUBCATEGORY, GET_SUBCATEGORIES } from "../ActionType";

const initialState = {
    isLoading: false,
    subcategorie: [],
    error: null
}

export const subcategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SUBCATEGORIES:
            return {
                isLoading: false,
                subcategorie: action.payload,
                error: null
            }
        case ADD_SUBCATEGORY:
            return {
                isLoading: false,
                subcategorie: state.subcategorie.concat(action.payload),
                error: null
            }
        case DELETE_SUBCATEGORY:
            return {
                isLoading: false,
                subcategorie: state.subcategorie.filter((v) => v.id != action.payload),
                error: null
            }
        case EDIT_SUBCATEGORY:
            return {
                isLoading: false,
                subcategorie: state.subcategorie.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v;
                    }
                }),
                error: null
            }
        default:
            return state;
    }
}