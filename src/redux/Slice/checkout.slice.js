import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

export const getBilling = createAsyncThunk(
    'checkout/getBilling',
    async () => {
        try {
            const response = await fetch("http://localhost:8080/checkout")
            const data = await response.json();

            return data
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const addBilling = createAsyncThunk(
    'checkout/addBilling',
    async (data) => {
        try {
            const response = await fetch("http://localhost:8080/checkout", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const pdata = await response.json();

            return pdata
        } catch (error) {
            console.log(error);
            
        }
    }
)

const CheckoutSlice = createSlice({
    name: 'checkout',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getBilling.fulfilled, (state, action) => {
            state.coupon = action.payload;
        })
        builder.addCase(addBilling.fulfilled, (state, action) => {
            state.coupon = state.coupon.concat(action.payload);
        })
    }
})

export default CheckoutSlice.reducer;