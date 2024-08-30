import { useReducer } from "react";
import { combineReducers } from "redux";
import CounterSlice from "../Slice/Counter.slice";
import categoriesSlice from "../Slice/categories.slice";
import subcategoriesSlice from "../Slice/subcategories.slice";
import productSlice from "../Slice/product.slice";
import cartSlice from "../Slice/cart.slice";


export const rootReducer = combineReducers({
    counter: CounterSlice,
    categories: categoriesSlice,
    subcategories : subcategoriesSlice,
    products: productSlice,
    cart: cartSlice
})