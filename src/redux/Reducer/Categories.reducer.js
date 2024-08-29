import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, GET_CATEGORIES } from "../ActionType"

const initialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const categorieReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_CATEGORIES:
            return {
                isLoading: false,
                categories: action.payload,
                error: null
            }
        case ADD_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.concat(action.payload),
                error: null
            }
        case DELETE_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.filter((v) => v.id != action.payload),
                error: null
            }
        case EDIT_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v;
                    }
                }),
                error: null
            }

        default:
            return state

    }
}