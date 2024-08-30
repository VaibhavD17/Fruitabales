import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    cart: [],
    error: null
}


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addtoCart: (state, action) => {

            const pid = action.payload
            
            const index = state.cart.findIndex((v) => v.pid === pid)

            if (index === -1) {
                state.cart.push({pid, qty:1})
            } else {
                state.cart[index].qty++
            }
            
            
            
        }
    }
})

export const { addtoCart } = cartSlice.actions;

export default cartSlice.reducer;