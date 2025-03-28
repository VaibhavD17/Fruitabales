import { combineReducers } from "redux";
import CounterSlice from "../Slice/Counter.slice";
import categoriesSlice from "../Slice/categories.slice";
import subcategoriesSlice from "../Slice/subcategories.slice";
import productSlice from "../Slice/product.slice";
import cartSlice from "../Slice/cart.slice";
import couponSlice from "../Slice/coupon.slice";
import reviewSlice from "../Slice/review.slice";
import checkoutSlice from "../Slice/checkout.slice";
import AuthSlice from "../Slice/Auth.slice";


export const rootReducer = combineReducers({
    counter: CounterSlice,
    categories: categoriesSlice,
    subcategories: subcategoriesSlice,
    products: productSlice,
    cart: cartSlice,
    coupon: couponSlice,
    review: reviewSlice,
    checkOut: checkoutSlice,
    auth: AuthSlice,
})