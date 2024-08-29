import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT, GET_PRODUCTS } from "../ActionType";

const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS:
            return {
                isLoading: false,
                products: action.payload,
                error: null
            }
        case ADD_PRODUCT:
            return {
                isLoading: false,
                products: state.products.concat(action.payload),
                error: null
            }
        case DELETE_PRODUCT:
            return {
                isLoading: false,
                products: state.products.filter((v) => v.id != action.payload),
                error: null
            }
        case EDIT_PRODUCT:
            return {
                isLoading: false,
                products: state.products.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload;
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