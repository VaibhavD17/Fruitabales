import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"


const initialState = {
    isLoading: false,
    coupon: [],
    error: null
}

export const getCoupon = createAsyncThunk(
    'coupon/getCoupon',
    async () => {
        try {
            const response = await fetch("http://localhost:8080/coupon");
            const data = await response.json();
            
            return data;
            
        } catch (error) {
            console.log(error);

        }
    }
)

export const addCoupon = createAsyncThunk(
    'coupon/addCoupon',
    async (data) => {
        try {
            const response = await fetch("http://localhost:8080/coupon", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const fData = await response.json();

            return fData;

        } catch (error) {
            console.log(error);

        }
    }
)

export const deleteCoupon = createAsyncThunk (
    'coupon/deleteCoupon',
    async (id) => {
        try {
            await fetch("http://localhost:8080/coupon/" + id, {
                method:'DELETE'
            }) 
            return id;
        } catch (error) {
            console.log(error);
            
        }
    }
)

export const updateCoupon = createAsyncThunk(
    'coupon/updateCoupon',
    async (data) => {
        try {
            const response = await fetch("http://localhost:8080/coupon/" + data.id, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
            const fData = await response.json();

            return fData;
        } catch (error) {
            console.log(error);

        }
    }
)

const couponSlice = createSlice({
    name: 'coupon',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getCoupon.fulfilled, (state, action) => {
            state.coupon = action.payload;
        })
        builder.addCase(addCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.concat(action.payload);
        })
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.filter((v) => v.id != action.payload);
        })
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v;
                }
            })
        })
    }
})

export default couponSlice.reducer;